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
    username:         'KeanuReaves',
    email:        'Keanu@reaves.com',
    password:     123456,
    remote_photo_url: 'https://www.celebplasticsurgeryonline.com/wp-content/uploads/2016/01/Keanu-Reeves-plastic-surgery-6-150x150.jpg'
  },
  {
    username:         'TonyTheFoodie',
    email:        'tony@stark.com',
    password:     123456,
    remote_photo_url: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=935&q=80'
  },
  {
    username:         'AliceTravels',
    email:        'alice@user.com',
    password:     123456,
    remote_photo_url: 'http://0.gravatar.com/avatar/30f790b7f70e98813f7393a487bf8f15?s=96&d=mm&r=g'
  },
  {
    username:         'SassySusan',
    email:        'susan@user.com',
    password:     123456,
    remote_photo_url: 'https://a.wattpad.com/useravatar/ToastedBagels.128.633251.jpg'

  },
  {
    username:         'PaalR',
    email:        'paal@user.com',
    password:     123456,
    remote_photo_url: 'https://res.cloudinary.com/wagon/image/upload/c_fill,g_face,h_200,w_200/wqtw0azktsumv6hdkwqo.jpg'

  },
  {
    username:         'SarahTheSurfer',
    email:        'sara@user.com',
    password:     123456,
    remote_photo_url: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'

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
    title:    ' BreathtakingPasta',
    content:  '@TheItalian. The pasta here is breathtaking! You gotta try out the meatball pasta!',
    latitude:      -37.822687,
    longitude:      144.989990,
    remote_photo_url:    "https://images.unsplash.com/photo-1515516969-d4008cc6241a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
    user_id:        all_users[0].id
  },
  {
    title:    'Winter Illumination!',
    content:  'This hidden gem is absolutely beautiful!!!',
    latitude:      -37.822308,
    longitude:      144.988722,
    remote_photo_url:    "https://mymodernmet.com/wp/wp-content/uploads/archive/WM2U5MZbcl8jQphw6JIl_1082108286.jpeg",
    user_id:        all_users[1].id
  },
  {
    title:    'Pineapple Pizza',
    content:  '@PineappleKitchen This place has the best pineapple pizza on EARTH!!!',
    latitude:      -37.822793,
    longitude:      144.991326,
    remote_photo_url:    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/11/24/17/istock-537640710.jpg?w968h681",
    user_id:        all_users[2].id
  },
  {
    title:    'Cool Bar',
    content:  '@TheDrunkenWhale Fantastic night! Live Music, Moody Atmosphere, Half price happy hour ending at 8pm',
    latitude:      -37.824925,
    longitude:      144.990963,
    remote_photo_url:    "https://images.unsplash.com/photo-1559070581-ec616bb3a176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80",
    user_id:        all_users[3].id
  },
  {
    title:    'Quaint little restaurant',
    content:  'Found this hidden gem. Great BBQ service. Workers are lovely!',
    latitude:      -37.822588,
    longitude:      144.991940,
    remote_photo_url:    "https://images.unsplash.com/photo-1476055439777-977cdf3a5699?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
    user_id:        all_users[4].id
  },
  {
    title:    'Cool Market Place',
    content:  'Found this small little marketplace. Hope this helps anyone looking for something interesting to buy!',
    latitude:      -37.821351,
    longitude:     144.990868,
    remote_photo_url:    "https://images.unsplash.com/photo-1506972905718-359e73c4c49a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    user_id:        all_users[5].id
  }
]

Post.create!(posts_attributes)
puts "Created #{posts_attributes.length} Posts"
