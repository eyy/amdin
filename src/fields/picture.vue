<template>
  <div>
    <div v-if="!conf" class="error">
        {{ ___('No Cloudinary Account.') }}
    </div>

    <div v-else>
      <input
        type="file"
        :multiple="path.multiple"
        accept="image/*"
        style="display:none"
        @change="show"
        axis="xy"
        ref="input"
      />
      <button
        v-if="path.multiple || !value.length && !files.length"
        class="other"
        @click.prevent="$refs.input.click()"
      >
        + {{ ___('Select Files') }}
      </button>
      <button
        @click.prevent="upload"
        v-if="files.length"
      >
        &uparrow; {{ ___('Upload') }}
      </button>

      <div class="pictures" v-if="files.length">
        <div v-for="(file, index) in files" :key="index" class="picture">
          <img :src="file.blob" height="120" />
          <span>
            <a href="#" @click.prevent="files.splice(index, 1)" :title="___('Delete')">&times;</a>
          </span>
          {{ ___(file.status) }}
        </div>
      </div>

      <sortable-list
        tag="ul"
        v-if="value.length"
        v-model="here"
        class="pictures"
        :use-drag-handle="true"
      >
        <sortable-item
          tag="li"
          v-for="(file, index) in here"
          :index="index"
          :key="file.public_id"
          :class="{ picture: true, deleted: file.deleted }"
        >
          <img v-if="file.url" :src="resize(file.url, 120)"/>
          <span>
            <a href="#" v-handle :title="___('Order')" class="sort" v-show="here.length > 1">&updownarrow;</a>
            <a href="#" @click.prevent="del(index)" :title="___('Delete')">&times;</a>
          </span>
        </sortable-item>
      </sortable-list>
    </div>
  </div>
</template>

<script>
import map from 'lodash/map'
import { SortableList, SortableItem, HandleDirective } from '../components/sort'
import { start } from '../rest'

const blob = (window.URL || window.webkitURL).createObjectURL || (() => '')

export default {
  inject: [ 'preSave' ],
  props: {
    value: { type: Array, 'default': () => [] },
    path: Object
  },
  data: () => ({
    files: [],
    conf: {}
  }),
  computed: {
    here: {
      get () {
        return this.value || []
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  async created () {
    let { conf: { cloudinary } } = await start()
    this.preSave.push(() => this.upload())
    this.conf = cloudinary
  },
  methods: {
    show () {
      this.files = map(this.$refs.input.files, f => ({
        name: f.name,
        file: f,
        blob: blob(f),
        status: ''
      })).concat(this.files)
    },
    del (index) {
      let file = this.value[ index ]
      file.deleted = !file.deleted
      this.here.splice(index, 1, file)
    },
    async upload () {
      if (!this.conf || !this.files.length)
        return

      let { name, preset } = this.conf

      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[ i ]

        file.status = '...'

        let data = new FormData()
        data.append('upload_preset', preset)
        data.append('file', file.file)

        let res = await fetch(`https://api.cloudinary.com/v1_1/${name}/upload`, {
          method: 'POST',
          body: data
        })
          .then(res => res.json())

        if (res.error) {
          console.error('upload error', res.error)
          file.status = 'Error'
        }
        else {
          console.log('picture uploaded', res)
          this.$emit('input', [ res ].concat(this.value))
          file.status = 'Done'
        }
      }
      this.files = this.files.filter(f => f.status === 'Error')
    },
    resize (url, h) {
      let tokens = url.split('/')
      tokens.splice(-2, 0, `h_${h},c_scale`)
      return tokens.join('/')
    }
  },
  components: { SortableList, SortableItem },
  directives: { handle: HandleDirective }
}
</script>

<style lang="stylus">
.pictures
  margin-top .5em
  user-select none
  padding 0
.picture
  position relative
  /*margin 0 .5em*/
  list-style none
  img
    min-height 100px
    min-width 100px
    background #dfdfdf
  span
    position absolute
    left 0
    top 0
    [dir=rtl] &
      right 0
      left auto
  a
    background white
    padding .2em
    text-decoration none
    &.sort
      user-select none
      cursor move
  &.deleted
    img
      filter grayscale(1) blur(2px)
      opacity .5
</style>
