const uuid = require('uuid').v4;
const sessions = {
    001: {
      username: 'Jingbaba',
      recipes: [
        'Jingbaba_001',
        'Jingbaba_002',
      ]
    },
    002: {
      username: 'BrendaBlanco',
      recipes: [
        'BrendaBlanco_001',
      ]
    },
    003: {
      username: '',
      recipes: []
    }
  };

const recipes_ls = {
Jingbaba_001: {
    title: "Vanilla Cupcakes",
    author: "Jingbaba",
    image: 'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2016/08/simply-perfect-vanilla-cupcakes-4-600x900.jpg',
    description: "This is my favorite recipe for homemade vanilla cupcakes. Using creamed butter, cake flour, sour cream, and egg whites, these cupcakes are soft, sweet, fluffy, and infinitely buttery.",
    ingredients: `1 and 3/4 cups (200g) cake flour (spoon & leveled)
    3/4 teaspoon baking powder
    1/4 teaspoon baking soda
    1/4 teaspoon salt
    1/2 cup (115g) unsalted butter, softened to room temperature
    1 cup (200g) granulated sugar
    3 large egg whites, at room temperature
    2 teaspoons pure vanilla extract
    seeds scraped from 1/2 of a vanilla bean
    1/2 cup (120g) full-fat sour cream at room temperature
    1/2 cup (120ml) whole milk at room temperature
    vanilla buttercream and sprinkles for decorating (I use Sweetapolita brand)`,
    instructions: `Preheat the oven to 350°F (177°C). Line a 12-cup muffin pan with cupcake liners. Line a second pan with 2 liners. Set aside.
    Whisk the cake flour, baking powder, baking soda, and salt together. Set aside.
    Using a handheld or stand mixer fitted with a paddle attachment, beat the butter on high speed until smooth and creamy, about 1 minute. Add the sugar and beat on high speed for 2 minutes until creamed together. Scrape down the sides and up the bottom of the bowl with a rubber spatula as needed. Add the egg whites, vanilla extract, and vanilla bean. Beat on medium-high speed until combined, then beat in the sour cream. Scrape down the sides and up the bottom of the bowl as needed. With the mixer on low speed, add the dry ingredients until just incorporated. With the mixer still running on low, slowly pour in the milk until combined. Do not over-mix. You may need to whisk it all by hand to make sure there are no lumps at the bottom of the bowl. The batter will be slightly thick.
    Pour/spoon the batter into the liners, or until a toothpick inserted in the center comes out clean. For around 30 mini cupcakes, bake for about 11-13 minutes, same oven temperature. Allow the cupcakes to cool completely before frosting.
    Frost cooled cupcakes with vanilla buttercream. I simply used an icing knife. Leftover cupcakes keep well covered tightly in the refrigerator for 3 days.`
},
Jingbaba_002: {
    title: "Cookies & Cream Pie (Oreo)",
    author: "Jingbaba",
    image: "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2020/10/cookies-and-cream-pie-600x900.jpg",
    description: "This cookies & cream pie features a crunchy Oreo cookie crust and gloriously creamy filling that sets up in the refrigerator. Easy enough for any beginner baker to handle!",
    ingredients: `1 cup (240ml) cold heavy cream or heavy whipping cream
    one 8-ounce block (225g) full-fat cream cheese, softened to room temperature
    3/4 cup (90g) confectioners’ sugar
    1 teaspoon pure vanilla extract
    12 whole Oreos (Double Stuf or regular), chopped
    optional for topping: homemade whipped cream`,
    instructions: `Preheat to 350°F (177°C).
    Make the crust: In a food processor or blender, pulse the whole Oreos (cream filling and cookie) into a fine crumb. You should have about 2 cups. Stir the Oreo crumbs and melted butter together. Press tightly into the bottom and up the sides of a 9-inch pie dish. Bake for 10 minutes. Allow to cool as you prepare the filling.
    Make the filling: Using a hand mixer or a stand mixer fitted with a whisk attachment, whip the cold heavy cream into stiff peaks on medium-high speed, about 4 minutes. Set aside. Using a hand mixer or a stand mixer fitted with a whisk or paddle attachment, beat the cream cheese on medium speed until perfectly smooth and creamy. Scrape down the sides and up the bottom of the bowl with a rubber spatula as needed. Add the confectioners’ sugar and vanilla extract and beat on medium-high speed until combined. Make sure there are no large lumps of cream cheese. If there are lumps, keep beating until smooth.
    Using your mixer on low speed or a rubber spatula, fold the whipped cream and chopped Oreos into the cream cheese mixture until combined. This takes several turns of your rubber spatula. Combine slowly as you don’t want to deflate all the air in the whipped cream.
    Spread filling into cooled crust. Use an offset spatula to smooth down the top.
    Cover tightly with plastic wrap or aluminum foil and refrigerate for at least 6 hours and up to 2 days. The longer refrigerated, the better the pie will set up. You could also freeze the pie for at least 4 hours and up to 3 months. The crust is a little difficult to eat frozen, though.
    Feel free to garnish the pie with whipped cream. I used Ateco 849 piping tip for the whipped cream in the pictured pie. Using a clean sharp knife, cut into slices for serving. For neat slices, wipe the knife clean between each slice.
    Cover and store leftover pie in the refrigerator or freezer for up to 5 days.`
},
BrendaBlanco_001: {
    title: "How To Make The Best Homemade Pizza",
    author: "Brenda Blanco",
    image: "https://www.skinnytaste.com/wp-content/uploads/2020/05/Margherita-Pizza-1-3.jpg",
    description: "Classic homemade pizza recipe, including pizza dough and toppings, step-by-step instructions with photos. Make perfect pizza at home!",
    ingredients: `2 cups warm water
    1 teaspoon sugar
    2 teaspoons active dry yeast
    7 cups all-purpose flour, plus more for dusting
    6 tablespoons extra virgin olive oil, plus more for greasing
    2 teaspoons kosher salt
    a half cup of semolina flour`,
    instructions: `“Bloom” the yeast by sprinkling the sugar and yeast in the warm water. Let sit for 10 minutes, until bubbles form on the surface.
    In a large bowl, combine the flour and salt. Make a well in the middle and add the olive oil and bloomed yeast mixture. Using a spoon, mix until a shaggy dough begins to form.
    Once the flour is mostly hydrated, turn the dough out onto a clean work surface and knead for 10-15 minutes. The dough should be soft, smooth, and bouncy. Form the dough into a taut round.
    Grease a clean, large bowl with olive oil and place the dough inside, turning to coat with the oil. Cover with plastic wrap. Let rise for at least an hour, or up to 24 hours.
    Punch down the dough and turn it out onto a lightly floured work surface. Knead for another minute or so, then cut into 4 equal portions and shape into rounds.
    Lightly flour the dough, then cover with a kitchen towel and let rest for another 30 minutes to an hour while you prepare the sauce and any other ingredients.
    Preheat the oven as high as your oven will allow, between 450-500˚F (230-260˚C). Place a pizza stone, heavy baking sheet (turn upside down so the surface is flat), or cast iron skillet in the oven.
    Meanwhile, make the tomato sauce: Add the salt to the can of tomatoes and puree with an immersion blender, or transfer to a blender or food processor, and puree until smooth.
    Once the dough has rested, take a portion and start by poking the surface with your fingertips, until bubbles form and do not deflate.
    Then, stretch and press the dough into a thin round. Make it thinner than you think it should be, as it will slightly shrink and puff up during baking.
    Sprinkle semolina onto an upside down baking sheet and place the stretched crust onto it. Add the sauce and ingredients of your choice.
    Slide the pizza onto the preheated pizza stone or pan. Bake for 15 minutes, or until the crust and cheese are golden brown.
    Add any garnish of your preference.
    Nutrition Calories: 1691 Fat: 65 grams Carbs: 211 grams Fiber: 12 grams Sugars: 60 grams Protein: 65 grams
    Enjoy!`
},
Amanda_002: {
    title: "Mexican Street Tacos",
    author: "Chungah",
    image: "https://s23209.pcdn.co/wp-content/uploads/2019/04/Mexican-Street-TacosIMG_9091.jpg",
    description: "Easy, quick, authentic carne asada street tacos you can now make right at home! Top with onion, cilantro + fresh lime juice! SO GOOD!",
    ingredients: `2 tablespoons reduced sodium soy sauce
    2 tablespoons freshly squeezed lime juice
    2 tablespoons canola oil, divided
    3 cloves garlic, minced
    2 teaspoons chili powder
    1 teaspoon ground cumin
    1 teaspoon dried oregano
    1 1/2 pounds skirt steak, cut into 1/2-inch pieces
    12 mini flour tortillas, warmed
    3/4 cup diced red onion
    1/2 cup chopped fresh cilantro leaves
    1 lime, cut into wedges`,
    instructions: `In a medium bowl, combine soy sauce, lime juice, 1 tablespoon canola oil, garlic, chili powder, cumin and oregano.
    In a gallon size Ziploc bag or large bowl, combine soy sauce mixture and steak; marinate for at least 1 hour up to 4 hours, turning the bag occasionally.
    Heat remaining 1 tablespoon canola oil in a large skillet over medium high heat. Add steak and marinade, and cook, stirring often, until steak has browned and marinade has reduced, about 5-6 minutes, or until desired doneness.
    Serve steak in tortillas, topped with onion, cilantro and lime.`
},
};

const username_sid = {};

const isValidSession = function (sid)
{
return sessions[sid];
};
const validateUsername = function (username)
{
const errors = [];
if (!username)
{
    errors.push('username was empty');
}
const clean = username.trim()
if (clean !== username)
{

    errors.push('username is not valid');
}
if (username.includes('dog'))
{
    errors.push('username contained disallowed characters');
}

return errors;
};
const createSession = function (username)
{
const sid = uuid();
sessions[sid] = {
    username: username,
    recipes: []
};
username_sid[username] = sid;
return sid;
};

const session = {
    sessions,
    recipes_ls,
    username_sid,
    isValidSession,
    validateUsername,
    createSession
}
module.exports = session;
