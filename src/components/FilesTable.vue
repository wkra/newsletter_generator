<template>
  <div>
    <v-data-table :headers="headers" :items="items" item-key="name" class="elevation-1" hide-actions>
      <template v-slot:items="props">
        <td class="text-xxs-left">{{ props.index + 1 }}</td>
        <td>{{ props.item.name }}</td>
        <td>
          <v-edit-dialog
            :return-value.sync="props.item.url"
            @save="save"
            @cancel="cancel"
            lazy
            large
          >
            <v-icon small class="mr-2">edit</v-icon>
            {{ props.item.url }}
            <template v-slot:input>
              <v-text-field v-model="props.item.url" label="Edit" single-line counter autofocus></v-text-field>
            </template>
          </v-edit-dialog>
        </td>
        <td>
          <v-edit-dialog
            :return-value.sync="props.item.alt"
            @save="save"
            @cancel="cancel"
            lazy
            large
          >
            <v-icon small class="mr-2">edit</v-icon>
            {{ props.item.alt }}
            <template v-slot:input>
              <v-text-field v-model="props.item.alt" label="Edit" single-line counter autofocus></v-text-field>
            </template>
          </v-edit-dialog>
        </td>
        <td class="text-xs-center">
          <v-btn
            flat
            icon
            color="blue lighten-2"
            round
            small
            :disabled="disableArrow || props.item.parent > -1"
            @click="move(props.index, props.index + 1, props.item.name)"
          >
            <v-icon>arrow_downward</v-icon>
          </v-btn>
          <v-btn
            flat
            icon
            color="green lighten-2"
            round
            small
            :disabled="disableArrow || props.item.parent > -1"
            @click="move(props.index, props.index - 1, props.item.name)"
          >
            <v-icon>arrow_upward</v-icon>
          </v-btn>
          <v-btn
            flat
            icon
            color="red lighten-2"
            round
            small
            @click="removeFile(props.item.id, props.item.name, props.item.parent)"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "FilesTable",
  components: {},
  props: {
    items: Array
  },
  data() {
    return {
      headers: [
        {
          text: "Index",
          align: "left",
          sortable: false,
          value: "index",
          width: "10px"
        },
        {
          text: "File name",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Link",
          value: "url",
          align: "center",
          sortable: false
        },
        {
          text: "Alt",
          value: "alt",
          align: "center",
          sortable: false
        },
        {
          text: "Actions",
          align: "center",
          value: "change",
          sortable: false
        }
      ]
    };
  },
  computed: {
    disableArrow() {
      if (this.items) {
        return this.items.length < 2;
      }
        return true;
    }
  },
  methods: {
    removeFile(id, name, parentId) {
      this.$store.dispatch('removeImgById', {id, parentId});
      this.$store.dispatch('setSnack', {text: `${name} removed`, color: "error"});
    },
    move(currIndex, newIndex, name) {
      const itemsLength = this.items.length;
      if (newIndex > itemsLength - 1) {
        newIndex = 0;
      }
      if (newIndex < 0) {
        newIndex = itemsLength - 1;
      }
      this.$store.dispatch('moveImg', { currIndex, newIndex});
      this.$store.dispatch('setSnack', {text: `${name} moved`, color: this.getSnackColor(currIndex, newIndex)});
    },
    getSnackColor(currIndex, newIndex) {
      return newIndex > currIndex ? "info" : "success";
    },
    save() {
      this.$store.dispatch('setSnack', {text: "Saved.", color: "success"});
    },
    cancel() {
      this.$store.dispatch('setSnack', {text: "Canceled.", color: "error"});
    }
  }
};
</script>
