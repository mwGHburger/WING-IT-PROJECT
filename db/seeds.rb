# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Cleaning database...'
User.destroy_all
Post.destroy_all

puts 'Assembling users...'

users_attributes = [
  {
    name:         'John',
    email:        'john@wick.com',
    password:     123456,
  },
  {
    name:         'user',
    email:        'user@user.com',
    password:     123456,
  }
]

User.create!(users_attributes)
puts "Finished creating #{users_attributes.length} users!"

puts 'Adding Posts'


posts_attributes = [
  {
    name:         'Batman',
    price:        1000,
    description:  'In the name of his murdered parents, Bruce Wayne wages eternal war on the criminals of Gotham City. He is vengeance. He is the night. He is Batman.',
    location:     'New York',
    user_id:      User.first.id,
    remote_photo_url:        "https://wallpapersite.com/images/pages/pic_h/18395.jpg"
  },
  {
    name:         'Superman',
    price:        9000,
    description:  'Faster than a speeding bullet, more powerful than a locomotive… The Man of Steel fights a never-ending battle for truth, justice, and the American way.',
    location:     'Manhattan',
    user_id:      User.first.id,
    remote_photo_url:        "https://wallpapersite.com/images/pages/pic_h/15372.png"
  }
]

Superhero.create!(superheroes_attributes)
puts "Finished creating #{superheroes_attributes.length} superheroes!"
