import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import type { AccountItem, TagItem, LSAccountItem } from '@/types';

import { useLocalStorage } from '@/composables/useLocalStorage';
import { useAccounts } from '@/composables/useAccounts';

type AccountsState = {
  accounts: AccountItem[];
  isLoading: boolean;
}

const LS_ACCOUNTS = 'accounts';

const {
  fetchLocalStorageData,
  saveDataToLocalStorage,
} = useLocalStorage(LS_ACCOUNTS);

const { getSerializedAccounts, getDeserializedFilteredAccounts } = useAccounts();

export const useAccountStore = defineStore('account', {
  state(): AccountsState {
    return {
      accounts: [],
      isLoading: false,
    };
  },

  actions: {
    async fetchAccounts(): Promise<void> {
      this.isLoading = true;

      const lsAccountsDataInJson = await fetchLocalStorageData();

      if (!lsAccountsDataInJson) {
        this.isLoading = false;

        return;
      }

     this.accounts = getSerializedAccounts(lsAccountsDataInJson);
     this.isLoading = false;
    },

    saveToLocalStorage(accounts: Ref<AccountItem[]>): void {
      const deserializedFilteredAccounts: LSAccountItem[] = getDeserializedFilteredAccounts(accounts);

      saveDataToLocalStorage(deserializedFilteredAccounts);
    },
  },
})