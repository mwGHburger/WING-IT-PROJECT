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
puts "Created #{users_attributes.length} users"

puts 'Adding Posts'


posts_attributes = [
  {
    content:  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui deserunt, repellat ipsam voluptates magnam ipsum quam minima? Perspiciatis, porro eligendi sapiente commodi, quam nulla sed? Et quos repudiandae cum!',
    lng:      31.336968,
    lat:      -109.560959,
    photo:    "",
    user_id:  User.first.id
  },
  {
    content:  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui deserunt, repellat ipsam voluptates magnam ipsum quam minima? Perspiciatis, porro eligendi sapiente commodi, quam nulla sed? Et quos repudiandae cum!',
    lng:      30.295053,
    lat:      -104.014528,
    photo:    "",
    user_id:  User.last.id
  }
]

Post.create!(posts_attributes)
puts "Created #{posts_attributes.length} Posts"
