<template>
  <div class="m-2 d-flex ga-5">
    <v-card
      style="max-height: 85vh;"
      @drop="drop_on_list"
      draggable="true"
      @dragover.prevent
      v-for="list in lists"
      :key="list.index"
      :index="list.index"
      class="list p-2 mt-2 overflow-y-auto"
    >
      <div class="d-flex justify-content-between w-100">
        <input class="rounded p-1 text-light mt-1" v-model="list.name" />
        <h5
          @click="lists = lists.filter((list_) => list_.index != list.index)"
          class="mt-1 float-right text-light cursor-pointer back-dark d-flex justify-content-center rounded text-center icon"
        >
          <div class="bi bi-trash"></div>
        </h5>
      </div>
      <div class="items pb-2">
        <div
          v-for="item in list.items"
          :key="item.index"
          :list-id="list.index"
          :index="item.index"
          :id="`item-${item.index}`"
          class="item rounded p-1 cursor-pointer mt-1 position-relative"
          draggable="true"
          @dragstart="
            (ev) => {
              ev.dataTransfer.setData('text', ev.target.id);
            }
          "
        >
          <input
            style="background: none !important"
            type="text"
            class="text-light"
            :disabled="!item.selected"
            :id="`inp-${item.index}`"
            v-if="!item.onDrag"
            @blur="unselect(list.index, item.index)"
            v-model="item.title"
          />

          <div class="d-flex position-absolute label flex-column ga-2">
            <v-dialog max-width="800" persistent scrollable>
              <template v-slot:activator="{ props: activatorProps }">
                <div
                  v-bind="activatorProps"
                  v-if="item.selected"
                  class="label rounded p-1"
                >
                  <i class="bi bi-credit-card"></i> Open card
                </div>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card
                  min-height="530"
                  class="card-dialog position-relative p-3 pl-16 position-relative"
                >
                  <button
                    @click="isActive.value = false"
                    class="close back-dark position-absolute text-light icon rounded"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>

                  <h4>{{ item.title }}</h4>

                  <small>in <a href="#">To Do</a> List</small>
                  <small class="mt-10">Notifications</small>
                  <v-btn
                    variant="tonal"
                    :ripple="false"
                    style="width: fit-content"
                    class="text-none p-1"
                    @click="item.watching = !item.watching"
                    ><i class="bi bi-eye"></i>&nbsp;
                    <p class="mt-3">{{ item.watching ? "watching" : "watch" }}</p>
                    <i
                      v-if="item.watching"
                      class="bi bi-check-lg text-center p-1 bg-light rounded text-secondary-emphasis ms-1"
                    ></i>
                  </v-btn>
                  <div
                    class="float-right d-flex position-absolute align-items-start flex-column ga-2 right-bar"
                  >
                    <p>Add to card</p>
                    <div class="card-label rounded p-1 cursor-pointer">
                      <i class="bi bi-person-fill"></i> Members
                    </div>
                    <div class="card-label rounded p-1 cursor-pointer">
                      <i class="bi bi-tag-fill"></i> Labels
                    </div>
                    <div class="card-label rounded p-1 cursor-pointer">
                      <i class="bi bi-list-check"></i> Check List
                    </div>
                    <div class="card-label rounded p-1 cursor-pointer">
                      <i class="bi bi-calendar-fill"></i> Dates
                    </div>
                    <div class="card-label rounded p-1 cursor-pointer">
                      <i class="bi bi-paperclip"></i> Attachment
                    </div>
                    <div class="card-label rounded p-1 cursor-pointer">
                      <i class="bi bi-card-image"></i> Cover
                    </div>
                    <div class="card-label rounded p-1 cursor-pointer">
                      <i class="bi bi-person-fill"></i> Custom Field
                    </div>
                  </div>
                  <h4>Description</h4>
                  <textarea></textarea>
                </v-card>
              </template>
            </v-dialog>
            <div v-if="item.selected" class="label rounded p-1">
              <i class="bi bi-tag-fill"></i> Edit Labels
            </div>
            <div v-if="item.selected" class="label rounded p-1">
              <i class="bi bi-person-fill"></i> Change members
            </div>
            <div v-if="item.selected" class="label rounded p-1">
              <i class="bi bi-tv"></i> change Cover
            </div>
            <div
              @click.stop="
                list.items = list.items.filter((item_) => item_.index !== item.index)
              "
              v-if="item.selected"
              class="label rounded p-1"
            >
              <i class="bi bi-trash-fill"></i> Archive
            </div>
          </div>

          <i
            class="bi bi-pen float-right rounded-circle text-center"
            style="height: 26px; width: 26px"
            @click="
              item.selected = !item.selected;
              focus(item.index);
            "
          ></i>
        </div>
        <div style="height: 45px" class="d-flex">
          <p
            style="width: calc(100% - 30px); height: 35px"
            class="add-button p-1 mt-3 mb-3 rounded cursor-pointer text-light"
            v-if="!list.in_add"
            @click.stop="
              list.in_add = true;
              focus_i();
            "
          >
            + Add a card
          </p>
          <input
            id="add_inp"
            style="width: 120%"
            class="add-button p-1 mt-3 rounded cursor-pointer text-light"
            v-model="list.new_text"
            v-if="list.in_add"
            placeholder="Enter a title for this card..."
            @keypress.enter="add(list.index)"
          />
          <div
            style="width: 35px; height: 35px"
            v-if="!list.in_add"
            class="text-center add-button p-1 mt-3 rounded cursor-pointer"
          >
            <i class="bi bi-card-text"></i>
          </div>
        </div>
        <div v-if="list.in_add" class="d-flex ga-1">
          <div
            @click.stop="add(list.index)"
            style="background-color: #579dff !important"
            class="button cursor-pointer rounded p-1"
          >
            Add card
          </div>
          <div
            style="width: 30px"
            class="button cursor-pointer rounded p-1 text-light text-center"
            @click="list.in_add = false"
          >
            X
          </div>
        </div>
      </div>
    </v-card>
    <div>
      <div
        v-if="!in_add_l"
        @click="in_add_l = true"
        class="pr-16 text-center add-button p-2 mt-3 rounded-lg cursor-pointer add-list"
      >
        <b>+ Add another List</b>
      </div>
      <input
        class="add-button p-1 mt-3 rounded cursor-pointer text-light bg-dark"
        v-if="in_add_l"
        placeholder="List Title"
        v-model="new_list_text"
        @keypress.enter="add_list"
      />
      <div v-if="in_add_l" class="d-flex ga-1 mt-1">
        <div
          style="background-color: #579dff !important"
          class="button cursor-pointer rounded p-1"
          @click="add_list"
        >
          Add card
        </div>
        <div
          style="width: 30px"
          class="button cursor-pointer rounded p-1 text-light text-center"
          @click="in_add_l = false"
        >
          X
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const new_list_text = ref("");
const in_add_l = ref(false);

const current_index = ref(0);

const lists = ref([
  {
    index: 0,
    name: "To Do",
    new_text: "",
    in_add: false,
    current_index: 1,
    items: [
      {
        index: 0,
        title: "Project Planning",
        selected: false,
        watching: false,
        onDrag: false,
      },
      {
        index: 1,
        title: "Kickoff meeting",
        selected: false,
        watching: false,
        onDrag: false,
      },
    ],
  },
]);

function add_list() {
  new_list_text.value
    ? lists.value.push({
        index: (current_index.value += 1),
        current_index: -1,
        name: new_list_text.value,
        new_text: "",
        in_add: false,
        items: [],
      })
    : null;
  new_list_text.value = "";
  in_add_l.value = false;
}

function drop_on_list(ev) {
  let data = ev.dataTransfer.getData("text");
  let element = document.getElementById(data);
  if (element) {
    let el_index = parseInt(element.getAttribute("index"));
    let el_list_index = ev.target;
    let oel_list_index = parseInt(element.getAttribute("list-id"));

    while (el_list_index.getAttribute("index") == null) {
      el_list_index = el_list_index.parentElement;
    }

    el_list_index = el_list_index.getAttribute("index");
    el_list_index = parseInt(el_list_index);

    if (el_list_index != oel_list_index) {
      console.log(el_index);
      console.log(el_list_index);
      console.log(oel_list_index);

      let new_item = lists.value
        .filter((list_) => list_.index == oel_list_index)[0]
        .items.filter((item_) => item_.index == el_index)[0];
      const old_item_index = new_item.index;
      new_item.index = lists.value.filter(
        (list_) => list_.index == el_list_index
      )[0].current_index;

      lists.value.filter((list_) => list_.index == el_list_index)[0].items.push(new_item);
      new_item.index = old_item_index;
      lists.value.filter(
        (list_) => list_.index == oel_list_index
      )[0].items = lists.value
        .filter((list_) => list_.index == oel_list_index)[0]
        .items.filter((item_) => item_.index != el_index);
    }
  }
}

function add(list_index) {
  if (lists.value[list_index].new_text) {
    lists.value[list_index].items.push({
      index: (lists.value.current_index += 1),
      title: lists.value[list_index].new_text,
      selected: false,
      watching: false,
      onDrag: false,
    });
    lists.value[list_index].in_add = false;
  } else {
    document.querySelector("#add_inp").focus();
  }
}
function focus_i() {
  setTimeout(() => {
    document.querySelector("#add_inp").focus();
  }, 20);
}
function focus(id) {
  setTimeout(() => {
    document.querySelector(`#inp-${id}`).focus();
    setTimeout(() => {
      document.querySelector(`#inp-${id}`).focus();
    }, 200);
  }, 200);
}
function unselect(list_index, index) {
  setTimeout(() => {
    try {
      lists.value[list_index].items[index].selected = false;
      lists.value[list_index].new_text = "";
    } catch {
      null;
    }
  }, 200);
}
</script>

<style>
.right-bar {
  width: 40%;
  right: -150px;
  top: 50px;
}
div {
  overflow: visible !important;
}
.card-dialog {
  background-color: #333333 !important;
  color: white;
  margin-top: 2rem;
}
.card-dialog * {
  color: white;
}
.button:hover {
  opacity: 0.8;
  background-color: #ffffff50;
}
.add-list {
  height: 40px;
  background: #ffffff48;
  color: white !important;
}
.add-list:hover {
  background: #bfbecf48 !important;
}
.add-button {
  color: rgba(255, 255, 255, 0.281);
}
.add-button:hover {
  background-color: #1a1a1a;
}
.add-button:focus {
  background-color: #7d78c531;
}
div.list {
  border-radius: 15px;
  width: fit-content;
  background-color: #161616;
}
.back-dark.icon {
  width: 30px;
  height: 30px;
}
.back-dark {
  border: none;
}
.back-dark img,
.border-dark img {
  width: 30px;
}
.back-dark:not(:focus):hover {
  background: #d6d6d66b;
  cursor: pointer;
}
.back-dark.star:hover {
  font-size: 1.1rem;
}
.back-dark.active {
  background-color: white !important;
  color: blue !important;
}
.border-dark {
  border: 2px solid #00000000 !important;
}
.border-dark:hover {
  border: 2px solid #d6d6d693 !important;
  cursor: pointer;
}
.close {
  right: 20px;
  top: 15px;
}
input {
  border: none !important;
  outline: none !important;
  height: 30px;
}
input:focus {
  background-color: #ffffff31;
}
.item {
  background-color: #7d78c531;
  color: white;
  border: 2px solid #00000000;
}
.item:hover .bi-pen {
  opacity: 1;
}
.item .bi-pen {
  opacity: 0;
  font-size: 0.8rem;
  padding-top: 3px;
}
.item .bi-pen:hover {
  background-color: #d6d6d642;
}
.item:hover {
  border: 2px solid #3257fc6b;
}
.label {
  height: 35px;
  right: calc(-60% - 30px);
  top: 0;
  background-color: #3a3955;
}
.label:hover {
  background-color: #403e6b;
}
.card-label {
  height: 35px;
  width: 160px;
  top: 0;
  background-color: #444444;
}
.card-label:hover {
  background-color: #585858;
}
</style>
