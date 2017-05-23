'use strict';

var foods = '';
var foodNames = document.querySelectorAll('.ingredient_name');
for (var i = 0; i < foodNames.length; i++) {
  foods += `${foodNames[i]['innerText']},`;
}

axios.get('https://caloriepad.herokuapp.com/calories', {
  params: {
    foods: foods.slice(0, -1)
  }
})
.then(function(response) {
  var foodLists = '';
  var calories = response['data']['calories'];
  for (var i = 0; i < calories.length; i++) {
    foodLists += `
      <tr class="row">
        <td class="name">${calories[i]['ja_food_name']}</td>
        <td class="calorie">${calories[i]['food_per']}あたり ${calories[i]['food_calorie']}</td>
      </tr>
    `;
  }

  var div = document.createElement('div');
  div.id = 'caloriepad';
  div.innerHTML = `
    <div class="caloriepad_title_wrapper">
      <span class="caloriepad_title">caloriepad</span>
    </div>
    <div class="caloriepad_content_wrapper">
      <table>
        <thead></thead>
        <tbody>
          ${foodLists}
        </tbody>
      </table>
    </div>
  `;

  var element = document.getElementById('sk_product_recipe_promotion');
  element.parentNode.insertBefore(div, element);
})
.catch(function(error) {
  console.log(error);
});
