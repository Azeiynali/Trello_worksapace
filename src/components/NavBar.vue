<template>
  <v-toolbar class="bar">
    <template v-slot:prepend>
      <input
        @focus="inpFocus"
        class="back-dark text-light ms-5 bar-title p-1 rounded user-select-none cursor-pointer"
        value="Web Projects"
      />
      <i
        :class="{
          'back-dark rounded p-1 bi icon star text-center ms-2': true,

          'bi-star': !stared,
          'bi-star-fill text-yellow': stared,
        }"
        @click="stared = !stared"
      ></i>
      <i
        v-tooltip="'change Visibility'"
        class="back-dark rounded p-1 bi bi-people icon text-center ms-1"
      ></i>

      <v-btn
        v-tooltip="'board'"
        class="bg-light text-primary ms-2 text-none"
        :ripple="false"
        ><i class="bi bi-calendar3-fill"></i> &nbsp;Board</v-btn
      >
      <i
        v-tooltip="'customize views'"
        :class="{
          'bi bi-caret-down ms-1 back-dark rounded p-1 icon text-center': true,
          active: viewMenu,
        }"
        @click="viewMenu = !viewMenu"
      ></i>
    </template>
    <i
      v-tooltip="'Power-Ups'"
      class="text-center p-1 rounded mr-3 bi bi-rocket-takeoff back-dark icon"
    ></i>
    <i
      v-tooltip="'Automation'"
      class="text-center p-1 rounded mr-3 bi bi-lightning-fill back-dark icon"
    ></i>
    <div v-tooltip="'Filter'" class="text-center p-1 rounded mr-3 bi bi-filter back-dark">
      Filter
    </div>
    <v-divider class="ms-1 mr-2" inset vertical></v-divider>
    <div class="right-in-bar text-center rounded-circle mr-3 border-dark">
      <img src="https://avatars.githubusercontent.com/u/133362693?v=4" />
    </div>
    <v-dialog max-width="700" max-height="300">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          class="right-in-bar bg-light text-primary ms-2 text-none"
          :ripple="false"
          ><i class="bi bi-person-fill-add"></i> &nbsp;share</v-btn
        >
      </template>

      <template v-slot:default="{ isActive }">
        <v-card class="bg-grey-darken-4 p-3 d-flex flex-column ga-1 align-items-start">
          <div class="header">
            <button
              @click="isActive.value = false"
              class="close back-dark position-absolute text-light icon rounded"
            >
              <i class="bi bi-x-lg"></i>
            </button>
            <h2>Share Board</h2>
          </div>
          <div class="d-flex justify-content-between ga-1 mt-5 w-100">
            <v-text-field
              variant="outlined"
              placeholder="example@trello.com"
              hide-details
              single-line
              density="compact"
            ></v-text-field>
            <v-btn class="text-none" height="40" variant="tonal" :ripple="false">
              Member <i class="bi bi-caret-down"></i
            ></v-btn>
            <v-btn class="mpc text-none" height="40" variant="tonal" :ripple="false"
              >Share</v-btn
            >
          </div>

          <div class="mt-5 d-flex ga-3">
            <div
              class="p-1 text-center rounded"
              style="font-size: 1.3rem; width: 40px; height: 40px; background-color: gray"
            >
              <i class="bi bi-share-fill"></i>
            </div>
            <div class="d-flex flex-column">
              <p class="over-v" style="line-height: 13px">Share this board with a link</p>
              <a class="over-v" style="line-height: 3px" href="">create a link</a>
            </div>
          </div>
          <div class="mt-5 d-flex ga-3 over-v">
            <img
              style="width: 40px; height: 40px"
              class="text-center rounded-circle mr-3"
              src="https://avatars.githubusercontent.com/u/133362693?v=4"
            />
            <div class="d-flex flex-column over-v">
              <p class="over-v" style="line-height: 5px">Ali Z (you)</p>
              <small class="over-v" style="line-height: 13px"
                >@Azeiynali • workspace guest</small
              >
            </div>
            <v-btn
              class="text-none float-right ms-5"
              height="40"
              variant="tonal"
              :ripple="false"
            >
              Admin <i class="bi bi-caret-down"></i
            ></v-btn>
          </div>
        </v-card>
      </template>
    </v-dialog>
    <i
      @click="rightMenu = true"
      class="right-in-bar p-1 text-center rounded ms-1 mr-3 back-dark icon bi bi-three-dots-vertical"
    ></i>
  </v-toolbar>

  <!-- -------------------------------------------- -->

  <v-card>
    <v-layout>
      <v-navigation-drawer
        :width="320"
        permanent
        border="light s-sm"
        class="right-bar bg-grey-darken-4 p-2"
        location="right"
        v-model="rightMenu"
        temporary
      >
        <div class="p-3 text-center w-100 mt-2 ms-1 position-relative">
          <h5 class="ms-auto">Menu</h5>
          <button
            @click="rightMenu = false"
            class="close back-dark position-absolute text-light icon rounded"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <v-divider :thickness="2"></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            :ripple="false"
            class="w-100 text-left cursor-pointer"
            title="About this Board"
            ><small>add a description to your board</small></v-list-item
          >
          <v-list-item
            class="cursor-pointer"
            :ripple="false"
            title="Activity"
          ></v-list-item>
          <v-list-item
            class="cursor-pointer"
            :ripple="false"
            title="Archived items"
          ></v-list-item>
          <v-divider :thickness="2"></v-divider>
          <v-list-item
            class="cursor-pointer"
            :ripple="false"
            title="Settings"
          ></v-list-item>
          <v-list-item class="cursor-pointer" :ripple="false" title="">
            <font class="v-list-item-title">
              <img
                class="item-img rounded mr-1"
                src="https://trello-backgrounds.s3.amazonaws.com/665321b9755c6ef9570c37dc/480x210/8e5ce6bd324581c0268167c20b3c4577/%D8%AA%D8%B5%D9%88%DB%8C%D8%B1_%D8%B5%D9%81%D8%AD%D9%87_2024-05-29_083946.webp"
              />
              change Background
            </font></v-list-item
          >
          <v-list-item
            class="cursor-pointer"
            :ripple="false"
            title="Custom Fields"
          ></v-list-item>
          <v-list-item
            class="cursor-pointer"
            :ripple="false"
            title="Automation"
          ></v-list-item>
          <v-list-item
            class="cursor-pointer"
            :ripple="false"
            title="Power-Ups"
          ></v-list-item>

          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-list-item
                v-bind="activatorProps"
                class="cursor-pointer"
                :ripple="false"
                title=""
              >
                <font class="v-item-title">Make template</font>
                <small class="upBut ms-1">
                  <i class="bi bi-suitcase-lg-fill"></i> Upgrade</small
                >
              </v-list-item>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card
                class="bg-grey-darken-4 p-3 d-flex flex-column ga-1 align-items-center"
              >
                <button
                  @click="isActive.value = false"
                  class="close back-dark position-absolute text-light icon rounded"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
                <img src="https://trello.com/assets/d5edd99478515693b894.svg" alt="" />
                <div style="background-color: #6b6b12; color: black" class="upBut">
                  LIMITED TIME OFFER
                </div>
                <h3>Try Trello Premium for Free 30 Days!</h3>
                <small>explore the best of trello, no credit cards required!</small>
                <v-card-text>
                  <li>Unlimited boards</li>
                  <li>Unlimited collaborators</li>
                  <li>Advanced checklists</li>
                  <li>List colors</li>
                  <li>Admin and security features</li>
                  <li>Unlimited automations</li>
                  <li>And more!</li>
                </v-card-text>

                <v-btn
                  :ripple="false"
                  class="start-btn mt-5"
                  text="Start Free Trail"
                ></v-btn>
                <a href="#">explore plans</a>
              </v-card>
            </template>
          </v-dialog>
        </v-list>
        <v-list-item class="cursor-pointer" :ripple="false" title="Labels"></v-list-item>
        <v-list-item
          class="cursor-pointer"
          :ripple="false"
          title="Stickers"
        ></v-list-item>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const stared = ref(false);
const viewMenu = ref(false);
const rightMenu = ref(false);
const visibilityM = ref(false);

visibilityM;

function inpFocus(ev) {
  ev.target.select();
}
</script>

<style scoped>
:root {
  --prefix-btn-close-color: red;
}
.icon {
  width: 31px;
  height: 31px;
}
.star {
  transition: all 0.1s;
}
.bar {
  background: #18181859 !important;
  color: white;
}
.bar-title {
  font-weight: bold;
  width: 120px;
  text-align: center;
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
.bar-title:focus {
  background: rgba(0, 0, 0, 0.562);
  border: 2px solid white;
  outline: blue;
}
.close {
  right: 20px;
  top: 15px;
}
.border-light {
  border-color: #ffffff41 !important;
}
.v-list-item {
  background: none !important;
  border: #00000000 2px solid;
}
.v-list-item:hover {
  background: #ffffff17 !important;
}
.v-list-item:active {
  background: #ffffff2a !important;
  border: #ffffff98 2px solid;
}
.item-img {
  width: 20px;
  height: 20px;
}
.upBut {
  padding: 2px;
  font-size: 0.7rem;
  border-radius: 2px;
  width: max-content;
  background-color: #35001d;
}
.upBut:hover {
  background-color: #35001dad;
}
.start-btn {
  width: 90%;
  background-color: #3a9bdb;
}
.v-card a {
  text-decoration: none;
  opacity: 1 !important;
}
.v-card a:hover {
  text-decoration: underline;
}
.visibilityM {
  background-color: #202020;
}
input[placeholder="example@trello.com"] {
  font-size: 1px;
}
.mpc {
  background-color: #2890d4;
}
.over-v {
  overflow: visible !important;
}
</style>
