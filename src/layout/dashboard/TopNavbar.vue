<template>
  <nav
    class="navbar navbar-expand-lg navbar-absolute"
    :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu }"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div
          class="navbar-toggle d-inline"
          :class="{ toggled: $sidebar.showSidebar }"
        >
          <button
            type="button"
            class="navbar-toggler"
            aria-label="Navbar toggle button"
            @click="toggleSidebar"
          >
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="#pablo">{{ routeName }}</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation-index"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <!-- Navbar Visited Pages -->
       <!-- Start -->
      <div class="collapse navbar-collapse justify-content-center">
        <div v-for="(item , index) in links" :key="index" class="route-button">
          <div @click="() => $route.name !== item.name && $router.push({ name: item.name })">{{ item.name }}</div>
          <img width="16" height="16" src="https://img.icons8.com/material-outlined/24/ffffff/delete-sign.png" alt="delete-sign" @click="removeRoute(item.name)"/>
        </div>
      </div>
      <!-- End -->

      <collapse-transition>
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
            <div
              class="search-bar input-group"
              @click="searchModalVisible = true"
            >
              <!-- <input type="text" class="form-control" placeholder="Search...">
              <div class="input-group-addon"><i class="tim-icons icon-zoom-split"></i></div> -->
              <button
                class="btn btn-link"
                id="search-button"
                data-toggle="modal"
                data-target="#searchModal"
              >
                <i class="tim-icons icon-zoom-split"></i>
              </button>
              <!-- You can choose types of search input -->
            </div>
            <modal
              :show.sync="searchModalVisible"
              class="modal-search"
              id="searchModal"
              :centered="false"
              :show-close="true"
            >
              <input
                slot="header"
                v-model="searchQuery"
                type="text"
                class="form-control"
                id="inlineFormInputGroup"
                placeholder="SEARCH"
              />
            </modal>
            <base-dropdown
              tag="li"
              :menu-on-right="!$rtl.isRTL"
              title-tag="a"
              class="nav-item"
            >
              <a
                slot="title"
                href="#"
                class="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="true"
              >
                <div class="notification d-none d-lg-block d-xl-block"></div>
                <i class="tim-icons icon-sound-wave"></i>
                <p class="d-lg-none">New Notifications</p>
              </a>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item"
                  >Mike John responded to your email</a
                >
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item"
                  >You have 5 more tasks</a
                >
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item"
                  >Your friend Michael is in town</a
                >
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item"
                  >Another notification</a
                >
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Another one</a>
              </li>
            </base-dropdown>
            <base-dropdown
              tag="li"
              :menu-on-right="!$rtl.isRTL"
              title-tag="a"
              class="nav-item"
              menu-classes="dropdown-navbar"
            >
              <a
                slot="title"
                href="#"
                class="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="true"
              >
                <div class="photo">
                  <img src="img/anime3.png" />
                </div>
                <b class="caret d-none d-lg-block d-xl-block"></b>
                <p class="d-lg-none">Log out</p>
              </a>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Profile</a>
              </li>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Settings</a>
              </li>
              <div class="dropdown-divider"></div>
              <li class="nav-link">
                <a href="#" class="nav-item dropdown-item">Log out</a>
              </li>
            </base-dropdown>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import Modal from "@/components/Modal";
import navbarStore from "./navbarStore";
import { useRoute } from "vue-router/composables";

export default {
  components: {
    CollapseTransition,
    Modal,
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
      links : navbarStore.navbarAddedLinks
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    addRoute(route) {
      if (!this.links.some(link => link.name === route.name)) navbarStore.addLink(route);
    },
    removeRoute(name) {
      if (this.links.some(link => link.name === name)){
        navbarStore.removeLink(name);
        this.links = this.links.filter(link => link.name !== name)
      };
    }
  },
  mounted() {
    const route = {
      name: useRoute().name,
      path: useRoute().path,
    }
    this.addRoute(route);
  }
};
</script>
<style lang="scss" scoped>
.route-button {
  cursor: pointer;
  margin-left: 5px;
  transition: 0.3s;
  color: white;
  border: 1px solid white;
  padding: 5px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  &:hover {
    transform: scale(1.1);
  }
  > img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
}
</style>
