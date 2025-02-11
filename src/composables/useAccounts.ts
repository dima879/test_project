import type { Ref } from 'vue';
import  { type AccountItem, type TagItem, ERECORD_TYPES } from '@/types';

type LSAccountItem = Omit<AccountItem, 'tags'> & { tags: TagItem[] };

export const useAccounts = () => {
  const getSerializedAccounts = (lsAccounts: string): AccountItem[] => {
    const lsAccountsData: LSAccountItem[] = JSON.parse(lsAccounts);

    return lsAccountsData.map((account: LSAccountItem) => {
      return {
        ...account,
        tags: account.tags.map(({ text }) => text).join('; '),
      }
    });
  };

  const getDeserializedFilteredAccounts = (accounts: Ref<AccountItem[]>): LSAccountItem[] => {
    return accounts.value
      .filter((account: AccountItem) => {
      return !!(
          account.tags.length <= 50
            && account.type.length
            && account.login
            && account.login.length < 100
            && (
              account.type !== ERECORD_TYPES.ldap
                ? (account.password && account.password.length < 100)
                : true
            )
        )
      })
      .map((account: AccountItem) => {
      return {
        ...account,
        tags: account.tags.split(';').map((tag) => {
          return {
            text: tag.trim(),
          }
        }),
      }
    });
  };

  return { getSerializedAccounts, getDeserializedFilteredAccounts }
}