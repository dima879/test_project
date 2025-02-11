<template>
  <div class="accounts">
    <AccountsHeader
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
          <span class="list__tags">Метки/</span>
          <span class="list__type">Тип/</span>
          <span class="list__login">Логин/</span>
          <span class="list__password">Пароль</span>
        </div>

        <AccountRecord
          v-for="account in accounts"
          :key="account.id"
          :id="account.id"
          :tags="account.tags"
          :type="account.type"
          :login="account.login"
          :password="account.password"
          @onSaveAccount="saveAccount"
          @onDeleteAccount="deleteAccount"
        />
      </div>
    </div>

    <div v-else-if="!isLoading">
      <span class="accounts__empty-list">
        Список учетных записей пуст
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAccountStore } from '@/stores/account';

import AccountsHeader from '@/components/AccountsHeader.vue';
import InfoClue from '@/components/InfoClue.vue'
import AccountRecord from '@/components/AccountRecord.vue'

import { type AccountItem, ERECORD_TYPES } from '@/types';
import { storeToRefs } from 'pinia';

const accountStore = useAccountStore()
const { isLoading, accounts } = storeToRefs(accountStore)

onMounted(() => {
  accountStore.fetchAccounts();
})

const saveAccount = (accountData: AccountItem) => {
  const index = accounts.value.findIndex(({ id }) => id === accountData.id);
  accounts.value[index] = accountData;

  accountStore.saveToLocalStorage(accounts);
};

const addAccount = () => {
  const id = accounts.value.length ? Math.max(...accounts.value.map(({ id }) => id)) + 1 : 0;

  accounts.value.push({
    id,
    tags: '',
    type: ERECORD_TYPES.ldap,
    login: '',
    password: '',
  })
};

const deleteAccount = (deletedAccountId: number) => {
  accounts.value = accounts.value.filter(({ id }) => id !== deletedAccountId);
  accountStore.saveToLocalStorage(accounts)
};
</script>

<style scoped lang="scss">
.accounts {
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
}
</style>
