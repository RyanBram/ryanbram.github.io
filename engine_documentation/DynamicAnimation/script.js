/* globals Docute */

new Docute({
  target: '#docute',
  sourcePath: './',
  versions: {
    'Dynamic Motion': {
      link: '/'
    },
    'Dynamic Animation': {
      link: '/DynamicAnimation/'
    }
  },
  nav: [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'About',
      link: '/about'
    }
  ],
  sidebar: [

    {
      title: 'Dynamic Motion',
      links: [
        {
          title: 'Introduction',
          link: '/README'
        },
        {
          title: 'Basic Usage',
          link: '/BasicUsage'
        },
        {
          title: 'Shooting Template',
          link: '/ShootingTemplate'
        },
        {
          title: 'Random Template',
          link: '/RandomTemplate'
        },
        {
          title: 'Range Template',
          link: '/RangeTemplate'
        },
        {
          title: 'Circle Template',
          link: '/CircleTemplate'
        },
        {
          title: 'Special Template',
          link: '/SpecialTemplate'
        },
        {
          title: 'Display Template',
          link: '/DisplayTemplate'
        },
        {
          title: 'Special Template',
          link: '/SpecialTemplate'
        },
        {
          title: 'Control Template',
          link: '/ControlTemplate'
        },
        {
          title: 'Plugin Parameter',
          link: '/PluginParameter'
        },
        {
          title: 'Other Function',
          link: '/OtherFunction'
        },
        {
          title: 'List of Templates',
          link: '/ListofTemplates'
        }
      ]
    }

  ]
})
