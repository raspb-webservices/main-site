export interface ServiceModalSection {
	titleKey: string;
	itemKeys: string[];
}

export interface ServiceModalConfig {
	modalId: string;
	titleKey: string;
	perfectForKey: string;
	perfectForDescriptionKey: string;
	paragraphKeys?: string[];
	sections: ServiceModalSection[];
	infoBox: { labelKey: string; valueKey: string }[];
	closeButtonKey: string;
}

export const serviceModalConfigs: ServiceModalConfig[] = [
	// ── Websites ──
	{
		modalId: 'modal-onepage',
		titleKey: 'servicesPage_modals_onePage_title',
		perfectForKey: 'servicesPage_modals_onePage_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_onePage_perfectForDescription',
		paragraphKeys: [
			'servicesPage_modals_onePage_paragraph1',
			'servicesPage_modals_onePage_paragraph2',
			'servicesPage_modals_onePage_paragraph3'
		],
		sections: [
			{
				titleKey: 'servicesPage_modals_onePage_servicesDetailTitle',
				itemKeys: [
					'servicesPage_modals_onePage_servicesDetails_d1',
					'servicesPage_modals_onePage_servicesDetails_d2',
					'servicesPage_modals_onePage_servicesDetails_d3',
					'servicesPage_modals_onePage_servicesDetails_d4',
					'servicesPage_modals_onePage_servicesDetails_d5',
					'servicesPage_modals_onePage_servicesDetails_d6'
				]
			},
			{
				titleKey: 'servicesPage_modals_onePage_technicalFeaturesTitle',
				itemKeys: [
					'servicesPage_modals_onePage_technicalFeatures_t1',
					'servicesPage_modals_onePage_technicalFeatures_t2',
					'servicesPage_modals_onePage_technicalFeatures_t3'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_onePage_projectDuration', valueKey: 'servicesPage_modals_onePage_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_onePage_maintenance', valueKey: 'servicesPage_modals_onePage_maintenanceValue' }
		],
		closeButtonKey: 'servicesPage_modals_onePage_closeButton'
	},
	{
		modalId: 'modal-landing',
		titleKey: 'servicesPage_modals_landingPages_title',
		perfectForKey: 'servicesPage_modals_landingPages_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_landingPages_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_landingPages_conversionOptimizationTitle',
				itemKeys: [
					'servicesPage_modals_landingPages_conversionOptimization_c1',
					'servicesPage_modals_landingPages_conversionOptimization_c2',
					'servicesPage_modals_landingPages_conversionOptimization_c3',
					'servicesPage_modals_landingPages_conversionOptimization_c4',
					'servicesPage_modals_landingPages_conversionOptimization_c5'
				]
			},
			{
				titleKey: 'servicesPage_modals_landingPages_marketingIntegrationTitle',
				itemKeys: [
					'servicesPage_modals_landingPages_marketingIntegration_m1',
					'servicesPage_modals_landingPages_marketingIntegration_m2',
					'servicesPage_modals_landingPages_marketingIntegration_m3',
					'servicesPage_modals_landingPages_marketingIntegration_m4'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_landingPages_projectDuration', valueKey: 'servicesPage_modals_landingPages_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_landingPages_performance', valueKey: 'servicesPage_modals_landingPages_performanceValue' }
		],
		closeButtonKey: 'servicesPage_modals_landingPages_closeButton'
	},
	{
		modalId: 'modal-corporate',
		titleKey: 'servicesPage_modals_corporateWebsites_title',
		perfectForKey: 'servicesPage_modals_corporateWebsites_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_corporateWebsites_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_corporateWebsites_extensiveFeaturesTitle',
				itemKeys: [
					'servicesPage_modals_corporateWebsites_extensiveFeatures_e1',
					'servicesPage_modals_corporateWebsites_extensiveFeatures_e2',
					'servicesPage_modals_corporateWebsites_extensiveFeatures_e3',
					'servicesPage_modals_corporateWebsites_extensiveFeatures_e4',
					'servicesPage_modals_corporateWebsites_extensiveFeatures_e5',
					'servicesPage_modals_corporateWebsites_extensiveFeatures_e6',
					'servicesPage_modals_corporateWebsites_extensiveFeatures_e7'
				]
			},
			{
				titleKey: 'servicesPage_modals_corporateWebsites_advancedFunctionsTitle',
				itemKeys: [
					'servicesPage_modals_corporateWebsites_advancedFunctions_a1',
					'servicesPage_modals_corporateWebsites_advancedFunctions_a2',
					'servicesPage_modals_corporateWebsites_advancedFunctions_a3',
					'servicesPage_modals_corporateWebsites_advancedFunctions_a4',
					'servicesPage_modals_corporateWebsites_advancedFunctions_a5'
				]
			}
		],
		infoBox: [
			{
				labelKey: 'servicesPage_modals_corporateWebsites_projectDuration',
				valueKey: 'servicesPage_modals_corporateWebsites_projectDurationValue'
			},
			{ labelKey: 'servicesPage_modals_corporateWebsites_maintenance', valueKey: 'servicesPage_modals_corporateWebsites_maintenanceValue' }
		],
		closeButtonKey: 'servicesPage_modals_corporateWebsites_closeButton'
	},

	// ── CMS ──
	{
		modalId: 'modal-simple-cms',
		titleKey: 'servicesPage_modals_simpleCms_title',
		perfectForKey: 'servicesPage_modals_simpleCms_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_simpleCms_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_simpleCms_userFriendlyFeaturesTitle',
				itemKeys: [
					'servicesPage_modals_simpleCms_userFriendlyFeatures_u1',
					'servicesPage_modals_simpleCms_userFriendlyFeatures_u2',
					'servicesPage_modals_simpleCms_userFriendlyFeatures_u3',
					'servicesPage_modals_simpleCms_userFriendlyFeatures_u4',
					'servicesPage_modals_simpleCms_userFriendlyFeatures_u5',
					'servicesPage_modals_simpleCms_userFriendlyFeatures_u6'
				]
			},
			{
				titleKey: 'servicesPage_modals_simpleCms_technicalDetailsTitle',
				itemKeys: [
					'servicesPage_modals_simpleCms_technicalDetails_t1',
					'servicesPage_modals_simpleCms_technicalDetails_t2',
					'servicesPage_modals_simpleCms_technicalDetails_t3',
					'servicesPage_modals_simpleCms_technicalDetails_t4'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_simpleCms_setupTime', valueKey: 'servicesPage_modals_simpleCms_setupTimeValue' },
			{ labelKey: 'servicesPage_modals_simpleCms_training', valueKey: 'servicesPage_modals_simpleCms_trainingValue' }
		],
		closeButtonKey: 'servicesPage_modals_simpleCms_closeButton'
	},
	{
		modalId: 'modal-complex-cms',
		titleKey: 'servicesPage_modals_complexCms_title',
		perfectForKey: 'servicesPage_modals_complexCms_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_complexCms_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_complexCms_enterpriseFeaturesTitle',
				itemKeys: [
					'servicesPage_modals_complexCms_enterpriseFeatures_e1',
					'servicesPage_modals_complexCms_enterpriseFeatures_e2',
					'servicesPage_modals_complexCms_enterpriseFeatures_e3',
					'servicesPage_modals_complexCms_enterpriseFeatures_e4',
					'servicesPage_modals_complexCms_enterpriseFeatures_e5',
					'servicesPage_modals_complexCms_enterpriseFeatures_e6'
				]
			},
			{
				titleKey: 'servicesPage_modals_complexCms_scalabilityTitle',
				itemKeys: [
					'servicesPage_modals_complexCms_scalability_s1',
					'servicesPage_modals_complexCms_scalability_s2',
					'servicesPage_modals_complexCms_scalability_s3',
					'servicesPage_modals_complexCms_scalability_s4'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_complexCms_projectDuration', valueKey: 'servicesPage_modals_complexCms_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_complexCms_support', valueKey: 'servicesPage_modals_complexCms_supportValue' }
		],
		closeButtonKey: 'servicesPage_modals_complexCms_closeButton'
	},
	{
		modalId: 'modal-blog-cms',
		titleKey: 'servicesPage_modals_blogCms_title',
		perfectForKey: 'servicesPage_modals_blogCms_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_blogCms_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_blogCms_contentOptimizedFeaturesTitle',
				itemKeys: [
					'servicesPage_modals_blogCms_contentOptimizedFeatures_c1',
					'servicesPage_modals_blogCms_contentOptimizedFeatures_c2',
					'servicesPage_modals_blogCms_contentOptimizedFeatures_c3',
					'servicesPage_modals_blogCms_contentOptimizedFeatures_c4',
					'servicesPage_modals_blogCms_contentOptimizedFeatures_c5',
					'servicesPage_modals_blogCms_contentOptimizedFeatures_c6'
				]
			},
			{
				titleKey: 'servicesPage_modals_blogCms_monetizationTitle',
				itemKeys: [
					'servicesPage_modals_blogCms_monetization_m1',
					'servicesPage_modals_blogCms_monetization_m2',
					'servicesPage_modals_blogCms_monetization_m3',
					'servicesPage_modals_blogCms_monetization_m4'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_blogCms_projectDuration', valueKey: 'servicesPage_modals_blogCms_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_blogCms_contentMigration', valueKey: 'servicesPage_modals_blogCms_contentMigrationValue' }
		],
		closeButtonKey: 'servicesPage_modals_blogCms_closeButton'
	},
	{
		modalId: 'modal-headless-cms',
		titleKey: 'servicesPage_modals_headlessCms_title',
		perfectForKey: 'servicesPage_modals_headlessCms_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_headlessCms_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_headlessCms_apiFirstTitle',
				itemKeys: [
					'servicesPage_modals_headlessCms_apiFirst_a1',
					'servicesPage_modals_headlessCms_apiFirst_a2',
					'servicesPage_modals_headlessCms_apiFirst_a3',
					'servicesPage_modals_headlessCms_apiFirst_a4',
					'servicesPage_modals_headlessCms_apiFirst_a5',
					'servicesPage_modals_headlessCms_apiFirst_a6'
				]
			},
			{
				titleKey: 'servicesPage_modals_headlessCms_useCasesTitle',
				itemKeys: [
					'servicesPage_modals_headlessCms_useCases_u1',
					'servicesPage_modals_headlessCms_useCases_u2',
					'servicesPage_modals_headlessCms_useCases_u3',
					'servicesPage_modals_headlessCms_useCases_u4'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_headlessCms_projectDuration', valueKey: 'servicesPage_modals_headlessCms_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_headlessCms_technology', valueKey: 'servicesPage_modals_headlessCms_technologyValue' }
		],
		closeButtonKey: 'servicesPage_modals_headlessCms_closeButton'
	},

	// ── Applications ──
	{
		modalId: 'modal-web-apps',
		titleKey: 'servicesPage_modals_webApps_title',
		perfectForKey: 'servicesPage_modals_webApps_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_webApps_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_webApps_technicalAdvantagesTitle',
				itemKeys: [
					'servicesPage_modals_webApps_technicalAdvantages_t1',
					'servicesPage_modals_webApps_technicalAdvantages_t2',
					'servicesPage_modals_webApps_technicalAdvantages_t3',
					'servicesPage_modals_webApps_technicalAdvantages_t4',
					'servicesPage_modals_webApps_technicalAdvantages_t5',
					'servicesPage_modals_webApps_technicalAdvantages_t6'
				]
			},
			{
				titleKey: 'servicesPage_modals_webApps_exampleApplicationsTitle',
				itemKeys: [
					'servicesPage_modals_webApps_exampleApplications_e1',
					'servicesPage_modals_webApps_exampleApplications_e2',
					'servicesPage_modals_webApps_exampleApplications_e3',
					'servicesPage_modals_webApps_exampleApplications_e4',
					'servicesPage_modals_webApps_exampleApplications_e5'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_webApps_projectDuration', valueKey: 'servicesPage_modals_webApps_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_webApps_technology', valueKey: 'servicesPage_modals_webApps_technologyValue' }
		],
		closeButtonKey: 'servicesPage_modals_webApps_closeButton'
	},
	{
		modalId: 'modal-pwa',
		titleKey: 'servicesPage_modals_pwa_title',
		perfectForKey: 'servicesPage_modals_pwa_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_pwa_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_pwa_appLikeFeaturesTitle',
				itemKeys: [
					'servicesPage_modals_pwa_appLikeFeatures_a1',
					'servicesPage_modals_pwa_appLikeFeatures_a2',
					'servicesPage_modals_pwa_appLikeFeatures_a3',
					'servicesPage_modals_pwa_appLikeFeatures_a4',
					'servicesPage_modals_pwa_appLikeFeatures_a5',
					'servicesPage_modals_pwa_appLikeFeatures_a6'
				]
			},
			{
				titleKey: 'servicesPage_modals_pwa_technicalFeaturesTitle',
				itemKeys: [
					'servicesPage_modals_pwa_technicalFeatures_t1',
					'servicesPage_modals_pwa_technicalFeatures_t2',
					'servicesPage_modals_pwa_technicalFeatures_t3',
					'servicesPage_modals_pwa_technicalFeatures_t4',
					'servicesPage_modals_pwa_technicalFeatures_t5'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_pwa_projectDuration', valueKey: 'servicesPage_modals_pwa_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_pwa_advantage', valueKey: 'servicesPage_modals_pwa_advantageValue' }
		],
		closeButtonKey: 'servicesPage_modals_pwa_closeButton'
	},
	{
		modalId: 'modal-native-apps',
		titleKey: 'servicesPage_modals_nativeApps_title',
		perfectForKey: 'servicesPage_modals_nativeApps_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_nativeApps_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_nativeApps_nativeAdvantagesTitle',
				itemKeys: [
					'servicesPage_modals_nativeApps_nativeAdvantages_n1',
					'servicesPage_modals_nativeApps_nativeAdvantages_n2',
					'servicesPage_modals_nativeApps_nativeAdvantages_n3',
					'servicesPage_modals_nativeApps_nativeAdvantages_n4',
					'servicesPage_modals_nativeApps_nativeAdvantages_n5',
					'servicesPage_modals_nativeApps_nativeAdvantages_n6'
				]
			},
			{
				titleKey: 'servicesPage_modals_nativeApps_developmentApproachTitle',
				itemKeys: [
					'servicesPage_modals_nativeApps_developmentApproach_d1',
					'servicesPage_modals_nativeApps_developmentApproach_d2',
					'servicesPage_modals_nativeApps_developmentApproach_d3',
					'servicesPage_modals_nativeApps_developmentApproach_d4'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_nativeApps_projectDuration', valueKey: 'servicesPage_modals_nativeApps_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_nativeApps_appStore', valueKey: 'servicesPage_modals_nativeApps_appStoreValue' }
		],
		closeButtonKey: 'servicesPage_modals_nativeApps_closeButton'
	},
	{
		modalId: 'modal-complex-apps',
		titleKey: 'servicesPage_modals_complexApps_title',
		perfectForKey: 'servicesPage_modals_complexApps_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_complexApps_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_complexApps_enterpriseFeaturesTitle',
				itemKeys: [
					'servicesPage_modals_complexApps_enterpriseFeatures_e1',
					'servicesPage_modals_complexApps_enterpriseFeatures_e2',
					'servicesPage_modals_complexApps_enterpriseFeatures_e3',
					'servicesPage_modals_complexApps_enterpriseFeatures_e4',
					'servicesPage_modals_complexApps_enterpriseFeatures_e5',
					'servicesPage_modals_complexApps_enterpriseFeatures_e6'
				]
			},
			{
				titleKey: 'servicesPage_modals_complexApps_exampleSystemsTitle',
				itemKeys: [
					'servicesPage_modals_complexApps_exampleSystems_e1',
					'servicesPage_modals_complexApps_exampleSystems_e2',
					'servicesPage_modals_complexApps_exampleSystems_e3',
					'servicesPage_modals_complexApps_exampleSystems_e4',
					'servicesPage_modals_complexApps_exampleSystems_e5'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_complexApps_projectDuration', valueKey: 'servicesPage_modals_complexApps_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_complexApps_support', valueKey: 'servicesPage_modals_complexApps_supportValue' }
		],
		closeButtonKey: 'servicesPage_modals_complexApps_closeButton'
	},

	// ── Freestyle / Individual ──
	{
		modalId: 'modal-components',
		titleKey: 'servicesPage_modals_components_title',
		perfectForKey: 'servicesPage_modals_components_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_components_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_components_componentTypesTitle',
				itemKeys: [
					'servicesPage_modals_components_componentTypes_c1',
					'servicesPage_modals_components_componentTypes_c2',
					'servicesPage_modals_components_componentTypes_c3',
					'servicesPage_modals_components_componentTypes_c4',
					'servicesPage_modals_components_componentTypes_c5'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_components_projectDuration', valueKey: 'servicesPage_modals_components_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_components_integration', valueKey: 'servicesPage_modals_components_integrationValue' }
		],
		closeButtonKey: 'servicesPage_modals_components_closeButton'
	},
	{
		modalId: 'modal-design',
		titleKey: 'servicesPage_modals_design_title',
		perfectForKey: 'servicesPage_modals_design_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_design_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_design_designServicesTitle',
				itemKeys: [
					'servicesPage_modals_design_designServices_d1',
					'servicesPage_modals_design_designServices_d2',
					'servicesPage_modals_design_designServices_d3',
					'servicesPage_modals_design_designServices_d4',
					'servicesPage_modals_design_designServices_d5'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_design_projectDuration', valueKey: 'servicesPage_modals_design_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_design_tools', valueKey: 'servicesPage_modals_design_toolsValue' }
		],
		closeButtonKey: 'servicesPage_modals_design_closeButton'
	},
	{
		modalId: 'modal-extensions',
		titleKey: 'servicesPage_modals_extensions_title',
		perfectForKey: 'servicesPage_modals_extensions_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_extensions_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_extensions_extensionServicesTitle',
				itemKeys: [
					'servicesPage_modals_extensions_extensionServices_e1',
					'servicesPage_modals_extensions_extensionServices_e2',
					'servicesPage_modals_extensions_extensionServices_e3',
					'servicesPage_modals_extensions_extensionServices_e4',
					'servicesPage_modals_extensions_extensionServices_e5'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_extensions_projectDuration', valueKey: 'servicesPage_modals_extensions_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_extensions_compatibility', valueKey: 'servicesPage_modals_extensions_compatibilityValue' }
		],
		closeButtonKey: 'servicesPage_modals_extensions_closeButton'
	},
	{
		modalId: 'modal-special-apps',
		titleKey: 'servicesPage_modals_specialApps_title',
		perfectForKey: 'servicesPage_modals_specialApps_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_specialApps_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_specialApps_applicationExamplesTitle',
				itemKeys: [
					'servicesPage_modals_specialApps_applicationExamples_a1',
					'servicesPage_modals_specialApps_applicationExamples_a2',
					'servicesPage_modals_specialApps_applicationExamples_a3',
					'servicesPage_modals_specialApps_applicationExamples_a4',
					'servicesPage_modals_specialApps_applicationExamples_a5'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_specialApps_projectDuration', valueKey: 'servicesPage_modals_specialApps_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_specialApps_approach', valueKey: 'servicesPage_modals_specialApps_approachValue' }
		],
		closeButtonKey: 'servicesPage_modals_specialApps_closeButton'
	},

	// ── KI Services ──
	{
		modalId: 'modal-ki-beratung',
		titleKey: 'servicesPage_modals_kiConsulting_title',
		perfectForKey: 'servicesPage_modals_kiConsulting_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_kiConsulting_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_kiConsulting_consultingServicesTitle',
				itemKeys: [
					'servicesPage_modals_kiConsulting_consultingServices_c1',
					'servicesPage_modals_kiConsulting_consultingServices_c2',
					'servicesPage_modals_kiConsulting_consultingServices_c3',
					'servicesPage_modals_kiConsulting_consultingServices_c4',
					'servicesPage_modals_kiConsulting_consultingServices_c5',
					'servicesPage_modals_kiConsulting_consultingServices_c6'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_kiConsulting_projectDuration', valueKey: 'servicesPage_modals_kiConsulting_projectDurationValue' },
			{ labelKey: 'servicesPage_modals_kiConsulting_deliverable', valueKey: 'servicesPage_modals_kiConsulting_deliverableValue' }
		],
		closeButtonKey: 'servicesPage_modals_kiConsulting_closeButton'
	},
	{
		modalId: 'modal-ki-agenten',
		titleKey: 'servicesPage_modals_kiAgentDevelopment_title',
		perfectForKey: 'servicesPage_modals_kiAgentDevelopment_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_kiAgentDevelopment_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_kiAgentDevelopment_agentTypesTitle',
				itemKeys: [
					'servicesPage_modals_kiAgentDevelopment_agentTypes_a1',
					'servicesPage_modals_kiAgentDevelopment_agentTypes_a2',
					'servicesPage_modals_kiAgentDevelopment_agentTypes_a3',
					'servicesPage_modals_kiAgentDevelopment_agentTypes_a4',
					'servicesPage_modals_kiAgentDevelopment_agentTypes_a5',
					'servicesPage_modals_kiAgentDevelopment_agentTypes_a6'
				]
			}
		],
		infoBox: [
			{
				labelKey: 'servicesPage_modals_kiAgentDevelopment_projectDuration',
				valueKey: 'servicesPage_modals_kiAgentDevelopment_projectDurationValue'
			},
			{ labelKey: 'servicesPage_modals_kiAgentDevelopment_training', valueKey: 'servicesPage_modals_kiAgentDevelopment_trainingValue' }
		],
		closeButtonKey: 'servicesPage_modals_kiAgentDevelopment_closeButton'
	},
	{
		modalId: 'modal-workflow',
		titleKey: 'servicesPage_modals_workflowOptimization_title',
		perfectForKey: 'servicesPage_modals_workflowOptimization_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_workflowOptimization_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_workflowOptimization_optimizationAreasTitle',
				itemKeys: [
					'servicesPage_modals_workflowOptimization_optimizationAreas_o1',
					'servicesPage_modals_workflowOptimization_optimizationAreas_o2',
					'servicesPage_modals_workflowOptimization_optimizationAreas_o3',
					'servicesPage_modals_workflowOptimization_optimizationAreas_o4',
					'servicesPage_modals_workflowOptimization_optimizationAreas_o5',
					'servicesPage_modals_workflowOptimization_optimizationAreas_o6'
				]
			},
			{
				titleKey: 'servicesPage_modals_workflowOptimization_measurableBenefitsTitle',
				itemKeys: [
					'servicesPage_modals_workflowOptimization_measurableBenefits_m1',
					'servicesPage_modals_workflowOptimization_measurableBenefits_m2',
					'servicesPage_modals_workflowOptimization_measurableBenefits_m3',
					'servicesPage_modals_workflowOptimization_measurableBenefits_m4'
				]
			}
		],
		infoBox: [
			{
				labelKey: 'servicesPage_modals_workflowOptimization_projectDuration',
				valueKey: 'servicesPage_modals_workflowOptimization_projectDurationValue'
			},
			{ labelKey: 'servicesPage_modals_workflowOptimization_roi', valueKey: 'servicesPage_modals_workflowOptimization_roiValue' }
		],
		closeButtonKey: 'servicesPage_modals_workflowOptimization_closeButton'
	},
	{
		modalId: 'modal-ai-infrastructure',
		titleKey: 'servicesPage_modals_aiInfrastructure_title',
		perfectForKey: 'servicesPage_modals_aiInfrastructure_perfectFor',
		perfectForDescriptionKey: 'servicesPage_modals_aiInfrastructure_perfectForDescription',
		sections: [
			{
				titleKey: 'servicesPage_modals_aiInfrastructure_serviceModelsTitle',
				itemKeys: [
					'servicesPage_modals_aiInfrastructure_serviceModels_s1',
					'servicesPage_modals_aiInfrastructure_serviceModels_s2',
					'servicesPage_modals_aiInfrastructure_serviceModels_s3',
					'servicesPage_modals_aiInfrastructure_serviceModels_s4',
					'servicesPage_modals_aiInfrastructure_serviceModels_s5',
					'servicesPage_modals_aiInfrastructure_serviceModels_s6'
				]
			},
			{
				titleKey: 'servicesPage_modals_aiInfrastructure_billingModelsTitle',
				itemKeys: [
					'servicesPage_modals_aiInfrastructure_billingModels_b1',
					'servicesPage_modals_aiInfrastructure_billingModels_b2',
					'servicesPage_modals_aiInfrastructure_billingModels_b3',
					'servicesPage_modals_aiInfrastructure_billingModels_b4'
				]
			}
		],
		infoBox: [
			{ labelKey: 'servicesPage_modals_aiInfrastructure_setupTime', valueKey: 'servicesPage_modals_aiInfrastructure_setupTimeValue' },
			{ labelKey: 'servicesPage_modals_aiInfrastructure_scaling', valueKey: 'servicesPage_modals_aiInfrastructure_scalingValue' }
		],
		closeButtonKey: 'servicesPage_modals_aiInfrastructure_closeButton'
	}
];
