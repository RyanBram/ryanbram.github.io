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
          title: 'Movement Template',
          link: '/MovementTemplate'
        },
        {
          title: 'Action Template',
          link: '/ActionTemplate'
        },
        {
          title: 'Visual Template',
          link: '/VisualTemplate'
        },
        {
          title: 'Control Template',
          link: '/ControlTemplate'
        },
        {
          title: 'Map Template',
          link: '/MapTemplate'
        },
        {
          title: 'Plugin Parameter',
          link: '/PluginParameter'
        },
        {
          title: 'List of Templates',
          link: '/ListofTemplates'
        },
        {
          title: 'Other Function',
          link: '/OtherFunction'
        },
        {
          title: 'Sample Technique - 1',
          link: '/SampleTechnique1'
        },
        {
          title: 'Sample Technique - 2',
          link: '/SampleTechnique2'
        },
        {
          title: 'Sample Technique - Bow',
          link: '/SampleTechniqueBow'
        },
        {
          title: 'Sample Technique - Magic',
          link: '/SampleTechniqueMagic'
        },
        {
          title: 'Sample Technique - Cooperative Skill',
          link: '/SampleTechniqueCooperativeSkill'
        },
        {
          title: 'Sample Technique - External Plugin',
          link: '/SampleTechniqueExternalPlugin'
        }
      ]
    }

  ]
})
