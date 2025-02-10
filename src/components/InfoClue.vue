<template>
  <div class="clue-wrapper">
    <div class="clue-wrapper__question-icon">
      <img src="@/assets/question-mark.svg" alt="Вопросительный знак">
    </div>
    <span>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </span>
  </div>
</template>

<style lang="scss" scoped>
.clue-wrapper {
  cursor: help;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #eeeeee;
  padding: 10px;

  &__question-icon {
    height: 24px;
    width: 24px;
    border: 1px #000 solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>