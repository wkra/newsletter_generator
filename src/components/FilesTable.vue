<template>
    <div>
    <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            hide-actions
    >
        <template v-slot:items="props">
            <td class="text-xs-left"> {{ props.index + 1 }}</td>
            <td>{{ props.item.name }}</td>
            <td>
                <v-edit-dialog
                        :return-value.sync="props.item.url"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        lazy
                ><v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
                >
                    edit
                </v-icon>{{ props.item.url }}
                    <template v-slot:input>

                        <v-text-field
                                v-model="props.item.url"
                                label="Edit"
                                single-line
                                counter
                                autofocus
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </td>
            <td class="text-xs-center">
                <v-btn flat icon color="blue lighten-2" round :disabled="props.index === items.length - 1" small
                       @click="move(props.index, props.index + 1)">
                    <v-icon>arrow_downward</v-icon>
                </v-btn>
                <v-btn flat icon color="green lighten-2" round :disabled="props.index === 0" small
                       @click="move(props.index, props.index - 1)">
                    <v-icon>arrow_upward</v-icon>
                </v-btn>
                <v-btn flat icon color="red lighten-2" round small @click="removeFile(props.index)">
                    <v-icon>close</v-icon>
                </v-btn>
            </td>
        </template>

    </v-data-table>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn flat @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: 'Nestle',
        components: {},
        props: {
            items: Array
        },
        data() {
            return {
                snack: false,
                snackColor: '',
                snackText: '',
                headers: [
                    {
                        text: 'Index',
                        align: 'left',
                        sortable: false,
                        value: 'index'
                    },
                    {
                        text: 'File name',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: 'Link',
                        value: 'url',
                        align: 'center',
                        sortable: false,
                    },
                    {
                        text: 'Actions',
                        align: 'center',
                        value: 'change',
                        sortable: false,
                    },

                ],
            }
        },
        methods: {
            removeFile(index) {
                this.$emit('removeFile', index);
            },
            move(currIndex, newIndex) {
                this.$emit('moveFile', {currIndex: currIndex, newIndex: newIndex});
            },
            save() {
                this.$emit('updateCode');
                this.snack = true;
                this.snackColor = 'success';
                this.snackText = 'Data saved';
            },
            cancel() {
                this.snack = true;
                this.snackColor = 'error';
                this.snackText = 'Canceled';
            },
            open() {
                this.snack = true;
                this.snackColor = 'info';
                this.snackText = 'Dialog opened';
            }
        }
    }
</script>