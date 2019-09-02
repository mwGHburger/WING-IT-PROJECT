Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  resources :posts, only: [:new, :create] do
    resources :upvotes, only: :create
  end
  resources :users, only: [:show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "map", to: "maps#map"
end
