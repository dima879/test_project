<template>
  <div class="accounts">
      <AccountsTitle
        class="accounts__title-wrapper"
        @addAccount="addAccount"
      />

      <div
        v-if="accounts.length"
        class="accounts__main-info"
      >
        <InfoClue />

        <div class="accounts__list list">
          <div class="list__title">
            <span class="tags">Метки</span>
            <span class="type">Тип</span>
            <span class="login">Логин</span>
            <span class="password">Пароль</span>
          </div>

          <AccountRecord
            v-for="(account, index) in accounts"
            v-model:tags="account.tags"
            v-model:type="account.type"
            v-model:login="account.login"
            v-model:password="account.password"
            @onSaveAccount="saveToLocalStorage"
            @onDeleteAccount="() => deleteAccount(index)"
          />
        </div>

      </div>

      <div v-else>
        <span class="accounts__empty-list">
          Список учетных записей пуст
        </span>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import AccountsTitle from '@/components/AccountsTitle.vue';
import InfoClue from '@/components/InfoClue.vue'
import AccountRecord from '@/components/AccountRecord.vue'

import {
  type AccountItem,
  type TagItem,
  RECORD_TYPES,
  ERECORD_TYPES,
} from '@/types';

const LS_ACCOUNTS = 'accounts';

const accounts: AccountItem[] = reactive([]);

// const lsAccounts: (Omit<AccountItem, 'tags'> & { tags: TagItem[] })[]  = reactive([]);

onMounted(() => {
  const lsAccountsDataInJson = localStorage.getItem(LS_ACCOUNTS);

  if (!lsAccountsDataInJson) {
    return;
  }

  const lsAccountsData = JSON.parse(lsAccountsDataInJson);

  const serializedAccountsData = lsAccountsData.map((
    account: Omit<AccountItem, 'tags'> & { tags: TagItem[] }
  ) => {
    return {
      ...account,
      tags: account.tags.map(({ text }) => text).join('; '),
    }
  });

  serializedAccountsData.forEach((account: AccountItem) => accounts.push(account));
})

const addAccount = () => {
  accounts.push({
    tags: '',
    type: ERECORD_TYPES.local,
    login: '',
    password: '',
  })
}

const saveToLocalStorage = () => {

  const serializedAccountsData = accounts.map((
    account: AccountItem
  ) => {
    return {
      ...account,
      tags: account.tags.split('; ').map((tag) => tag.trim()),
    }
  });

  localStorage.setItem(LS_ACCOUNTS, JSON.stringify(serializedAccountsData));
}

const deleteAccount = (index: number) => {
  accounts.splice(index, 1);

  saveToLocalStorage()
}
</script>

<style scoped lang="scss">
.accounts {
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;

    &__title {
      display: flex;
      padding-right: 34px;
      gap: 10px;

      .tags,
      .login,
      .password {
        flex: 3;
      }

      .type {
        flex: 2;
      }
    }
  }

  textarea {
    max-width: 300px;
  }
}
</style>
