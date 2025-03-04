<template>
  <div>
    <slot name="header" class="title"></slot>
    <slot name="footer" class="body"></slot>
  </div>
</template>

<style scoped>
.body {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>