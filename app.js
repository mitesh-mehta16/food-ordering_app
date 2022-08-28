window.onload = () => {
	let search_results = [];
	let filtered_results = [];

	// FETCHES API DATA
	const get_data = () => {
		fetch ('./restaurant.json')

		.then(resp => resp.json())

		.then((response) => {
			generate_view(response.restaurants);
			search();			
			filter_by_type();
		})
	}

	// CREATES / GETS INIDIVIDUAL CARD
	const generate_view = (data) => {
		// HIDE ALL THE CARDS INITIALLY
		const cards_wrapper = [].slice.call(document.getElementById('cards_wrapper').children);
		cards_wrapper.forEach(el => el.style.display = 'none');		

		// CLEAR OUR FILTERTED RESULTS
		filtered_results = [];

		// CREATE CARDS
		data.forEach((el, idx) => {
			// IF JSON
			if (el.id) {
				create_card(el, idx);
			}

			// IF HTML ELEMENTS
			else {
				document.getElementById('cards_wrapper').append(el);
				el.style.display = 'initial';				
			}
		});

	}

	// CREATES THE HTML FOR EACH INDIVIDUAL CARD
	const create_card = (rest, num) => {
		// CREATE CARD ELELEMNTS
		const card = document.createElement('ASIDE');
		const rest_name = document.createElement('P');
		const rest_add = document.createElement('P');
		const rest_type = document.createElement('P');

		// CREATE DATA
		rest_name.append(rest.name);
		rest_add.append("Address: "+ rest.address);
		rest_type.append("Cuisine: "+ rest.cuisine_type);

		// APPEND TEXT NODE TO CARD
		card.append(rest_name);
		card.append(rest_add);
		card.append(rest_type);

		// APPEND CARD TO DOM
		card.classList.add('card');
		card.setAttribute('data-type', rest.cuisine_type); // ADD DATA ATTRIBUTE
		card.setAttribute('data-name', rest.name); // ADD DATA ATTRIBUTE		
		card.setAttribute('data-id', num++); // INDIVIDUAL CARD ID
		cards_wrapper.append(card);	
	}

	const search = () => {
		const search_rests = document.getElementById('search_rests');
		const search_submit = document.getElementById('search_submit');
		
		let search_term;

		search_rests.addEventListener('change', function(event) {
			search_term = event.target.value;
		});

		search_submit.addEventListener('click', function (event) {
			event.preventDefault();
			

			// CLEAR PREVIOUS SEARCH RESULTS
			search_results = [];
	
			const cards_wrapper = [].slice.call(document.getElementById('cards_wrapper').children);
			// SEARCH BY NAME OR TYPE
			cards_wrapper.map((element) => {
				if (element.dataset.name.toLowerCase().includes(search_term.toLowerCase())) {
					search_results.push(element);
				}
				
				else if (element.dataset.type.toLowerCase().includes(search_term.toLowerCase())) {
					search_results.push(element);
				}
			});
			generate_view(search_results);

		});
	}

	// FILTER BY TYPE
	const filter_by_type = () => {
		const type_dd = document.getElementById('filter_by_type');
		const cards_wrapper = [].slice.call(document.getElementById('cards_wrapper').children);

		type_dd.addEventListener('change', function(e) {
			let selected_type = element.target.value;

			cards_wrapper.forEach((element) => {
				if (selected_type.localeCompare(element.dataset.type) == 0) {
					filtered_results.push(element);
				}
			});
			generate_view(filtered_results);
		});

	}

	get_data();
}