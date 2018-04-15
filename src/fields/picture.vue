<template>
  <div>
    <div v-if="value">
      <div v-for="file in value" :key="file.url">
        <img :src="file.url" height="80" width="auto" />
        <!--<button type="button" class="other danger">{{ ___('Delete') }}</button>-->
      </div>
    </div>

    <div v-if="files.length">
      <span v-for="file in files" :key="file.id">
        <img class="" v-if="file.thumb" :src="file.thumb" height="80" width="auto" />
        <!--<span>{{ file.name }}</span> - -->
        <!--<span>{{ file.size | formatSize }}</span> - -->
        &nbsp;
        <span v-if="file.error">{{file.error}}</span>
        <span v-else-if="file.success">success</span>
        <span v-else-if="file.active">active</span>
      </span>
    </div>

    <file-upload
      v-model="files"
      :post-action="action"
      :multiple="multiple"
      class="button other"
      extensions="gif,jpg,jpeg,png"
      accept="image/png,image/gif,image/jpeg"
      :size="1024 * 1024 * 10"
      @input-filter="filter"
      @input="ok"
      ref="upload"
    >
      + {{ ___('Select File') }}
    </file-upload>

    <div v-if="files.length">
      <button
        type="button"
        v-if="!$refs.upload || !$refs.upload.active"
        @click.prevent="$refs.upload.active = true"
      >
        &uparrow;
        {{ ___('Upload') }}
      </button>

      <button
        type="button"
        v-else
        @click.prevent="$refs.upload.active = false"
      >
        &squarf;
        {{ ___('Stop Upload') }}
      </button>
    </div>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import { root } from '../rest'

export default {
  props: [ 'value', 'path' ],
  data: () => ({
    files: [],
    action: root + 'upload',
    multiple: false
  }),
  components: { FileUpload },
  methods: {
    filter (newFile, oldFile) {
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }

        // Thumbnails
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
    },
    ok (files) {
      let uploadedFiles = files.filter(f => f.response.url).map(f => f.response)
      this.$emit('input', this.value.concat(uploadedFiles))
    }
  }
}
</script>

<style lang="stylus" scoped>
/*img*/
  /*padding 3px*/
  /*border 1px solid lightgrey*/
  /*border-radius 3px*/
</style>
