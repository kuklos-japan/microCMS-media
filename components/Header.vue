<template>
  <div>
    <header class="header">
      <h1 class="logo">
        <a href="https://cryptomoney.enteri-o.com">
          <img class="logoImg" src="/images/logo.svg" alt="CryptoMoney" />
        </a>
      </h1>
      <button class="menuBtn" @click="toggleOpen()">
        <img src="/images/icon_menu.svg" alt="menu" />
      </button>
      <div v-if="open" class="mask" @click="setOpen(false)"></div>

      <div class="menu" :class="{ isOpen: open }">
        <ul class="lists">
          <li class="list">
            <a href="https://cryptomoney.enteri-o.com">ブログ</a>
          </li>
          <li class="list">
            <a href="https://discord.gg/k6R9BdH9Ut">Discord</a>
          </li>
          <li class="list">
            <a href="https://note.com/cryptomoney">Note</a>
          </li>
          <li class="list">
            <a href="https://enteri-o.com/contact">お問い合わせ</a>
          </li>
        </ul>
      </div>
    </header>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: this.params || '',
      open: false,
    };
  },
  mounted() {
    this.params = location.search || '';
  },
  methods: {
    setOpen(value) {
      this.open = value;
    },
    toggleOpen() {
      this.open = !this.open;
    },
  },
};
</script>

<style scoped>
@media (min-width: 800px) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 12px 40px;
    z-index: 10;
    border-bottom: 1px solid var(--color-border);
    background-color: #faf9fb;
  }

  .empty {
    height: 80px;
    margin-bottom: 40px;
  }

  .logo {
    padding: 8px 0;
    margin-right: 30px;

    a {
      display: block;
      height: 28px;
    }
  }

  .logoImg {
    height: 96px;
    margin-top: -32px;
    margin-left: -16px;
  }

  .menuBtn {
    display: none;
  }

  .menu {
    display: flex;
    padding: 12px 0;
  }

  .lists {
    display: flex;
    align-items: center;

    &:first-child::after {
      content: '';
      width: 1px;
      height: 30px;
      background-color: var(--color-text-off);
      margin-right: 40px;
    }
  }

  .list {
    margin-right: 30px;
    white-space: nowrap;

    &.noMargin {
      margin: 0;
    }

    a,
    a:visited {
      color: var(--color-text-main);

      &.signup {
        border-radius: 5px;
        background: linear-gradient(to right bottom, #5630af, #3067af);
        color: #faf9fb;
        text-align: center;
        padding: 8px 24px;
      }

      &.signin {
        border-radius: 5px;
        background-color: var(--color-bg-purple);
        text-align: center;
        padding: 8px 24px;
      }
    }
  }
}

@media (max-width: 800px) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #faf9fb;
    padding: 16px;
    z-index: 10;
    border-bottom: 1px solid var(--color-border);
  }

  .empty {
    height: 61px;
  }

  .logo {
    display: inline-block;
    height: 28px;
  }

  .logoImg {
    height: 28px;
  }

  .menuBtn {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .menu {
    position: absolute;
    left: 0;
    top: 61px;
    display: none;
    flex-direction: column-reverse;
    width: 100%;
    background-color: #faf9fb;
    border-bottom: 1px solid var(--color-border);
    z-index: 2001;
    padding-top: 8px;

    &.isOpen {
      display: flex;
    }
  }

  .lists {
    padding: 8px 0;

    &:first-child {
      padding-top: 0;
    }
  }

  .list {
    padding: 0 16px;
    white-space: nowrap;

    a {
      display: block;
      color: var(--color-text-main);
      padding: 8px 0;
      border-bottom: 1px solid var(--color-border-light);

      &.signup {
        border-radius: 5px;
        background: linear-gradient(to right bottom, #5630af, #3067af);
        color: #faf9fb;
        text-align: center;
        font-weight: bold;
      }

      &.signin {
        display: block;
        border-radius: 5px;
        background-color: var(--color-bg-purple);
        text-align: center;
        font-weight: bold;
        margin-bottom: 12px;
      }
    }

    &:last-child a {
      border-bottom: none;
    }
  }

  .mask {
    position: fixed;
    top: 61px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2000;
  }
}
</style>
