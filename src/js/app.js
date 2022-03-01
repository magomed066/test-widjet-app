import '../css/style.css'

import Input from './views/Input'
import './views/userCard'
import './views/List'
import state from './state/State'

window.addEventListener('DOMContentLoaded', () => {
	const search = document.getElementById('search')
	const shortName = document.getElementById('name_short')
	const fullName = document.getElementById('name_full')
	const innKpp = document.getElementById('inn_kpp')
	const address = document.getElementById('address')

	console.log(Input.shadowRoot.querySelector('input'))

	state.addListener(() => {
		const { result } = state.getState()

		if (result?.value) {
			search.setAttribute('value', result?.value)
		}

		shortName.setAttribute('value', result?.value || '')
		fullName.setAttribute('value', result?.data?.name?.full_with_opf || '')
		address.setAttribute('value', result?.data?.address?.value || '')

		if (result?.data?.kpp && result?.data?.inn) {
			innKpp.setAttribute(
				'value',
				`${result?.data?.kpp} / ${result?.data?.inn}`,
			)
		} else {
			innKpp.setAttribute('value', '')
		}
	})
})
