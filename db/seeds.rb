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
    username:         'John',
    email:        'john@wick.com',
    password:     123456,
    remote_photo_url: 'https://www.celebplasticsurgeryonline.com/wp-content/uploads/2016/01/Keanu-Reeves-plastic-surgery-6-150x150.jpg'
  },
  {
    username:         'Tony',
    email:        'tony@user.com',
    password:     123456,
    remote_photo_url: 'https://gcs.thesouthafrican.com/2018/10/Len-cropped-2017-96x96.jpg'
  },
  {
    username:         'Alice',
    email:        'alice@user.com',
    password:     123456,
    remote_photo_url: 'http://0.gravatar.com/avatar/30f790b7f70e98813f7393a487bf8f15?s=96&d=mm&r=g'
  },
  {
    username:         'Susan',
    email:        'susan@user.com',
    password:     123456,
    remote_photo_url: 'https://a.wattpad.com/useravatar/ToastedBagels.128.633251.jpg'

  }
]

User.create!(users_attributes)
puts "Created #{users_attributes.length} users"
users = []
all_users = User.all
users << all_users
all_users = users.flatten
puts 'Adding Posts'


posts_attributes = [
  {
    title:    'Cool Location',
    content:  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui deserunt, repellat ipsam voluptates magnam ipsum quam minima? Perspiciatis, porro eligendi sapiente commodi, quam nulla sed? Et quos repudiandae cum!',
    latitude:      -37.824636,
    longitude:      144.992511,
    remote_photo_url:    "https://cdn.theculturetrip.com/images/56-3958266-144290995102dfa723eae64bd7b9f6696eabd08b7c.jpg",
    user_id:        all_users.sample.id
  },
  {
    title:    'Nice Place',
    content:  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui deserunt, repellat ipsam voluptates magnam ipsum quam minima? Perspiciatis, porro eligendi sapiente commodi, quam nulla sed? Et quos repudiandae cum!',
    latitude:      -37.8136,
    longitude:      144.9631,
    remote_photo_url:    "https://colabcdn.azureedge.net/-/media/Images/Melbourne/Location/1020-680/POSSIBLE-site_locations_1020-680_0008_melbourne.ashx",
    user_id:        all_users.sample.id
  },
  {
    title:    'Hidden Gem',
    content:  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui deserunt, repellat ipsam voluptates magnam ipsum quam minima? Perspiciatis, porro eligendi sapiente commodi, quam nulla sed? Et quos repudiandae cum!',
    latitude:      -37.227636,
    longitude:      164.992211,
    remote_photo_url:    "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hiddencitysecrets.com.au%2Fwp-content%2Fuploads%2F2016%2F10%2FRoyal-Saxon-Bar-Richmond-Bars-Melbourne-Cocktail-Top-Best-Good-002.jpg&f=1",
    user_id:        all_users.sample.id
  },
  {
    title:    'Good Food',
    content:  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui deserunt, repellat ipsam voluptates magnam ipsum quam minima? Perspiciatis, porro eligendi sapiente commodi, quam nulla sed? Et quos repudiandae cum!',
    latitude:      -37.9021,
    longitude:      145.0411,
    remote_photo_url:    "https://i2.au.reastatic.net/800x600/8a6ac19066a6b1e2ac93dd6cb1715cd6204701ab3d78690340f71f204c65681a/main.jpg",
    user_id:        all_users.sample.id
  },
  {
    title:    'Swan Street Brilliance',
    content:  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui deserunt, repellat ipsam voluptates magnam ipsum quam minima? Perspiciatis, porro eligendi sapiente commodi, quam nulla sed? Et quos repudiandae cum!',
    latitude:      -37.9525,
    longitude:      145.0123,
    remote_photo_url:    "https://www.film.vic.gov.au/images/locations/City%20of%20Yarra/Richmond_-_Swan_street/mcyar-sd-SwanStreet-Richmond_004.jpg",
    user_id:        all_users.sample.id
  },
  {
    title:    'Very Cool!',
    content:  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis qui deserunt, repellat ipsam voluptates magnam ipsum quam minima? Perspiciatis, porro eligendi sapiente commodi, quam nulla sed? Et quos repudiandae cum!',
    latitude:      -37.8400,
    longitude:     144.9890,
    remote_photo_url:    "https://adventuresofaplusk.com/wp-content/uploads/2019/05/DSC_6285-1024x684.jpg",
    user_id:        all_users.sample.id
  }
]

Post.create!(posts_attributes)
puts "Created #{posts_attributes.length} Posts"
