import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
	name: 'frontend',
	slug: 'frontend',
	scheme: 'frontend',
	extra: {
		eas: {
			projectId: 'local-dev'
		}
	},
	experiments: {
		turboModules: false
	}
};

export default config;