<template>
  <div class="q-pa-md">

    <div class="row q-col-gutter-y-md">
      <div class="col-4" v-for="n in 5" :key="`none-${n}`">
        <div class="my-content">&nbsp;</div>
      </div>
    </div>

  </div>
</template>

<style lang="stylus" scoped>
.my-content
  padding 10px 15px
  background rgba(86,61,124,.15)
  border 1px solid rgba(86,61,124,.2)
</style>
