export const getDataFromForm = (elem) => {
	const res = {}
	for(const [key, val] of Object.entries(elem.elements)) {
		res[key] = val.value
	}
	return JSON.stringify(res)
}