import '../css/style.css'

import userCard from './views/userCard'

import state from './state/State'
import service from './service/Service'
import resList from './views/ResList'
import input from './views/Input'

const search = document.getElementById('search')
const shirtName = document.getElementById('name_short')
const fullName = document.getElementById('name_full')
const innKpp = document.getElementById('inn_kpp')
const address = document.getElementById('address')

const searchHandler = async (e) => {
	e.preventDefault()

	const value = e.target.value

	const data = await service.getData(value)

	state.setState({
		results: data.suggestions,
		value,
	})

	const { results } = state.getState()

	resList.renderList(results)
}

search.addEventListener('input', searchHandler)

state.addListener(() => {
	const { result } = state.getState()

	search.value = result?.value || search.value
	shirtName.value = result?.value || ''
	fullName.value = result?.data?.name?.full_with_opf || ''
	address.value = result?.data?.address?.value || ''

	if (result?.data?.kpp && result?.data?.inn) {
		innKpp.value = `${result?.data?.kpp} / ${result?.data?.inn}`
	} else {
		innKpp.value = ''
	}
})
