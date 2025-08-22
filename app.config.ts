export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'Your Party democracy toolkit',
      description: 'A toolkit to help you organise build democracy, solidarity and collective action in Your Party structures',
    },
    theme: {
      customizable: true,
      color: 'zinc',
      radius: 0.5,
    },
    header: {
      title: 'Your Party democracy toolkit',
      showTitle: true,
      darkModeToggle: true,
      languageSwitcher: {
        enable: false,
        triggerType: 'icon',
        dropdownType: 'select',
      },
      logo: {
        light: '/android-chrome-512x512.png',
        dark: '/android-chrome-512x512.png',
      },
      nav: [],
    },
    aside: {
      useLevel: true,
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
    },
    footer: {
      credits: 'The Governance Design Working Group',
      // links: [{
      //   icon: 'lucide:github',
      //   to: 'https://github.com/ZTL-UwU/shadcn-docs-nuxt',
      //   target: '_blank',
      // }],
    },
    toc: {
      enable: true,
      links: [{
        title: 'Sign up to Your Party',
        icon: 'lucide:star',
        to: 'https://www.yourparty.uk/',
        target: '_blank',
      }, {
        title: 'Suggest an improvement',
        icon: 'lucide:mail',
        to: 'mailto:info@yourparty.tools',
        target: '_blank',
      }],
    },
    search: {
      enable: true,
      inAside: false,
    }
  }
});