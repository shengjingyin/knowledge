<template>
  <div
    class="box-hover"
    style="width: 200px; height: 100px; background: pink"
  ></div>
</template>
<script lang="ts" name="Effect">
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "Effect",
});
</script>

<style lang="less" scoped>
.box-hover {
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
  }
}
</style>
