<script>
import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      groceryList: [
        {id: 0, text: 'Vegetables'},
        {id: 1, text: 'Cheese'},
        {id: 2, text: 'Whatever else humans are supposed to eat'}
      ]
    }
  }
}
</script>

<template>
  <ol>
    <!--
      我们给每个 todo 项提供它所表示的 todo 对象，
      以便能够动态展示内容。
      同时还需要给每个组件提供一个“key”，
      这在指南的 v-for 部分有详细解释。
    -->
    <TodoItem
        v-for="item in groceryList"
        :todo="item"
        :key="item.id"
    />
  </ol>
</template>