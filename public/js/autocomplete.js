$(document).ready(function() {
  let autocompleteData = [];

  $('#search-input').on('input', function() {
    const query = $(this).val();
    if (query.length > 1) {
      $.ajax({
        url: '/inv/autocomplete',
        data: { q: query },
        success: function(data) {
          autocompleteData = data;
          if (data.length > 0) {
            const suggestions = data.map(item => `<div class="autocomplete-suggestion" data-id="${item.inv_id}">${item.inv_make} ${item.inv_model}</div>`);
            $('#autocomplete-suggestions').html(suggestions.join('')).show();
          } else {
            $('#autocomplete-suggestions').hide();
          }
        }
      });
    } else {
      $('#autocomplete-suggestions').hide();
    }
  });

  $(document).on('click', '.autocomplete-suggestion', function() {
    const invId = $(this).data('id');
    window.location.href = `/inv/detail/${invId}`;
  });

  $(document).click(function(e) {
    if (!$(e.target).closest('#search-form').length) {
      $('#autocomplete-suggestions').hide();
    }
  });

  $('#search-form').on('submit', function(e) {
    e.preventDefault();
    if (autocompleteData.length > 0) {
      const firstMatch = autocompleteData[0];
      window.location.href = `/inv/detail/${firstMatch.inv_id}`;
    } else {
      const query = $('#search-input').val().toLowerCase().trim();
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });
});