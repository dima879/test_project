<template>
  <div class="account-record">
    <input
      :class="['account-record__tags', { 'have-errors': !errors.isTagsValid && isTagsChanged }]"
      @focusout="validateTags"
      v-model="accountData.tags"
    >

    <select
      :class="['account-record__type', { 'have-errors': !errors.isTypeValid && isTypeChanged }]"
      @change="validateType"
      v-model="accountData.type"
    >
      <option
        :selected="accountData.type === ERECORD_TYPES.local"
        :value="ERECORD_TYPES.local"
      >
        {{ RECORD_TYPES.local }}
      </option>
      <option
        :selected="accountData.type === ERECORD_TYPES.ldap"
        :value="ERECORD_TYPES.ldap"
      >
        {{ RECORD_TYPES.ldap }}
      </option>
    </select>

    <input
      :class="[
        'account-record__login',
        { 'have-errors': !errors.isLoginValid && isLoginChanged },
        { 'no-password': !isPasswordNeeded }
      ]"
      @focusout="validateLogin"
      v-model="accountData.login"
    >

    <div
      class="account-record__password-wrapper password-wrapper"
      v-if="isPasswordNeeded"
    >
      <input
        :class="['password-wrapper__password', { 'have-errors': !errors.isPasswordValid && isPasswordChanged }]"
        :type="isPasswordVisible ? 'text' : 'password'"
        @focusout="() => validatePassword({ isCheckNeeded: true })"
        v-model="accountData.password"
      >
      <div
        :class="['password-wrapper__icon', { 'password-wrapper__icon--hidden': !isPasswordVisible }]"
        @click="togglePasswordVisible"
      />
    </div>

    <Button @onClick="$emit('onDeleteAccount', accountData.id)">
      <img src="@/assets/trash-icon.svg" alt="Корзина">
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';

import { ERECORD_TYPES, RECORD_TYPES, type AccountItem } from '@/types';

import Button from '@/components/Base/Button.vue';

interface ValidateErrors {
  isTagsValid: boolean;
  isTypeValid: boolean;
  isLoginValid: boolean;
  isPasswordValid: boolean;
}

const props = defineProps<AccountItem>()

const emit = defineEmits<{
  (e: 'onDeleteAccount', id: number): void
  (e: 'onSaveAccount', accountData: AccountItem): void
}>()

const accountData: AccountItem = reactive({...props})

const isTagsChanged = ref(false);
const isTypeChanged = ref(false);
const isLoginChanged = ref(false);
const isPasswordChanged = ref(false);

const isPasswordVisible = ref(false);
const errors = ref<ValidateErrors>({
  isTagsValid: true,
  isTypeValid: false,
  isLoginValid: false,
  isPasswordValid: false,
});

const isFieldsValid = computed<boolean>(() => {
  return !!(
    accountData.tags.length <= 50
      && accountData.type.length
      && accountData.login
      && accountData.login.length < 100
      && (
        isPasswordNeeded.value
          ? (accountData.password && accountData.password.length < 100)
          : true
      )
  )
  });

const isPasswordNeeded = computed<boolean>(() => {
  return accountData.type !== ERECORD_TYPES.ldap;
})

const togglePasswordVisible = (): void => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const onSaveAccount = (): void => {
  emit('onSaveAccount', accountData);
};

const validateTags = (): void => {
  isTagsChanged.value = true;
  errors.value.isTagsValid = !(accountData.tags.length > 50);

  if (isFieldsValid.value) {
    onSaveAccount();
  }
}

const validateType = () => {
  isTypeChanged.value = true;
  errors.value.isTypeValid = !!accountData.type.length;

  if (!isPasswordNeeded.value) {
    validatePassword({ isCheckNeeded: false} );

    accountData.password = null;
  } else {
    errors.value.isPasswordValid = false;
    isPasswordChanged.value = false;
  }

  if (isFieldsValid.value) {
    onSaveAccount();
  }
}

const validateLogin = () => {
  isLoginChanged.value = true;
  errors.value.isLoginValid = !!(accountData.login && accountData.login.length <= 100)

  if (isFieldsValid.value) {
    onSaveAccount();
  }
}

const validatePassword = ({ isCheckNeeded }: { isCheckNeeded: boolean }): void=> {
  isPasswordChanged.value = true;
  errors.value.isPasswordValid = !(
    isCheckNeeded && (!accountData.password || accountData.password.length > 100)
  );

  if (isFieldsValid.value) {
    onSaveAccount();
  }
}
</script>

<style lang="scss">
.account-record {
  display: flex;
  height: 30px;
  gap: 10px;
  align-items: center;

  & > * {
    height: 100%;
  }

  &__tags,
  &__login,
  &__password-wrapper {
    flex: 3;
  }

  &__type {
    flex: 2;
  }

  &__trash-icon {
    cursor: pointer;
    width: 24px;
    height: 24px;
    background-image: url('@/assets/trash-icon.svg');
  }

  .password-wrapper {
    position: relative;

    &__password {
      height: 100%;
      width: 100%;
    }

    &__icon {
      cursor: pointer;
      position: absolute;
      top: 8px;
      right: 5px;
      width: 26px;
      height: 14px;
      background-image: url('@/assets/blue-eye.svg');

      &--hidden {
        background-image: url('@/assets/red-eye.svg');
      }
    }
  }

  .have-errors {
    border-color: rgb(255, 0, 0);
  }

  .no-password {
    flex: 6;
  }
}
</style>