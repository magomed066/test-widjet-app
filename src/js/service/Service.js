import state from '../state/State'

class Service {
	_url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
	_token = '193c50c1c17d1fb954dddb13eb068017060a17e7'

	async getData(query) {
		const res = await fetch(this._url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Token ' + this._token,
			},
			body: JSON.stringify({ query: query }),
		})

		return await res.json()
	}
	s

	getByKPP(kpp) {
		const res = state.getState().results.find((item) => item.data.kpp === kpp)
		return res
	}
}

const service = new Service()

export default service
