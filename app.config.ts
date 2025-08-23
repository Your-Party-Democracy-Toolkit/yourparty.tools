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
      levelStyle: "header",
      languageSwitcher: {
        enable: false,
        triggerType: 'icon',
        dropdownType: 'select',
      },
      logo: {
        light: '/android-chrome-512x512.png',
        dark: '/android-chrome-512x512.png',
      },
      nav: [{
        title: 'Find your local',
        to: '/find-your-local',
        target: '_self',
        showLinkIcon: false,
      }, {
        title: 'Organising guides',
        to: '/guides',
        target: '_self',
        showLinkIcon: false,
      }],
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
      links: [{
        title: 'Contact us',
        icon: 'lucide:mail',
        to: 'mailto:info@yourparty.tools',
        target: '_blank',
      }, {
        title: 'Suggest an update',
        icon: 'lucide:pencil',
        to: 'mailto:info@yourparty.tools',
        target: '_blank',
      }],
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
    },
    umami: {
      enable: true,
      src: 'https://cloud.umami.is/script.js',
      dataWebsiteId: 'c01f3f26-4ec1-4ca8-9173-80304d429dc3',
    },
  }
});