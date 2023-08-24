/** @type  {import('next').NextConfig} */

const  path  =  require('path')

const  nextConfig  = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'lh3.googleusercontent.com',
			port: '',
			pathname: '/u/**',
		  },
		],
	  },
}

module.exports  =  nextConfig
