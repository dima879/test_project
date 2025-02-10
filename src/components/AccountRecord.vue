<template>
  <div class="account-record">
    <input
      :class="['account-record__tags', { 'have-errors': !errors.isTagsValid && isTagsChanged }]"
      @focusout="validateTags"
      v-model="tags"
    >
    <select
      :class="['account-record__type', { 'have-errors': !errors.isTypeValid && isTypeChanged }]"
      @change="validateType"
      v-model="type"
    >
      <option
        :selected="type === RECORD_TYPES.local"
      >
        {{ RECORD_TYPES.local }}
      </option>
      <option
        :selected="type === RECORD_TYPES.ldap"
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
      v-model="login"
    >
    <div
      class="account-record__password-wrapper password-wrapper"
      v-if="isPasswordNeeded"
    >
      <input
        :class="['password-wrapper__password', { 'have-errors': !errors.isPasswordValid && isPasswordChanged }]"
        :type="isPasswordVisible ? 'text' : 'password'"
        @focusout="() => validatePassword(true)"
        v-model="password"
      >
      <div
        :class="['password-wrapper__icon', { 'password-wrapper__icon--hidden': !isPasswordVisible }]"
        @click="togglePasswordVisible"
      />
    </div>
    <div
      class="account-record__trash-icon"
      @click="$emit('onDeleteAccount')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref, type ModelRef } from 'vue';
import { ERECORD_TYPES, RECORD_TYPES } from '@/types';

interface ValidateErrors {
  isTagsValid: boolean;
  isTypeValid: boolean;
  isLoginValid: boolean;
  isPasswordValid: boolean;
}

const tags = defineModel('tags') as ModelRef<string>;
const type = defineModel('type') as ModelRef<string>;
const login = defineModel('login') as ModelRef<string>;
const password = defineModel('password') as ModelRef<string | null>;

const emit = defineEmits<{
  (e: 'onDeleteAccount'): void
  (e: 'onSaveAccount'): void
}>()

const isTagsChanged = ref(false);
const isTypeChanged = ref(false);
const isLoginChanged = ref(false);
const isPasswordChanged = ref(false);

const isPasswordVisible = ref(false);
const errors: Ref<ValidateErrors> = ref({
  isTagsValid: true,
  isTypeValid: false,
  isLoginValid: false,
  isPasswordValid: false,
});

const isFieldsValid = computed(() => {
  return Object.values(errors.value).every((item) => item);
});

const isPasswordNeeded = computed(() => {
  return type.value !== RECORD_TYPES.ldap;
})

const togglePasswordVisible = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const onSaveAccount = () => {
  emit('onSaveAccount');
};

const validateTags = () => {
  isTagsChanged.value = true;

  if (tags.value.length > 50) {
    errors.value.isTagsValid = false;

    return;
  }

  errors.value.isTagsValid = true;

  if (isFieldsValid.value) {
    onSaveAccount();
  }
}

const validateType = () => {
  isTypeChanged.value = true;

  if (!type.value.length) {
    errors.value.isTypeValid = false;

    return;
  }

  if (!isPasswordNeeded.value) {
    validatePassword(false);

    password.value = null;
  } else {
    errors.value.isPasswordValid = false;
    isPasswordChanged.value = false;

  }

  errors.value.isTypeValid = true;

  if (isFieldsValid.value) {
    onSaveAccount();
  }
}

const validateLogin = () => {
  isLoginChanged.value = true;

  if (!login.value || login.value.length > 100) {
    errors.value.isLoginValid = false;

    return;
  }

  errors.value.isLoginValid = true;

  if (isFieldsValid.value) {
    onSaveAccount();
  }
}

const validatePassword = (isCheckNeeded = true) => {
  isPasswordChanged.value = true;

  if (isCheckNeeded && (!password.value || password.value.length > 100)) {
    errors.value.isPasswordValid = false;

    return;
  }

  errors.value.isPasswordValid = true;

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