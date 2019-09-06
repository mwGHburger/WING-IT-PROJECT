Rails.application.routes.draw do
  devise_for :users
  # Routes to homeapage
  root to: 'pages#home'
  resources :posts, only: [:index, :new, :create, :show] do
    # This route will coming later
    resources :comments, only: :create
    # upvote feature
    member do
      put "like" => "posts#vote"
    end
    # bookmark feature
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # Routes to main map
  get 'bookmarks/update'
  get "map", to: "maps#show", as: :map
  # get "posts/:id", to: "posts#show", as: :post
  get "dashboard/:id", to: "pages#show", as: :dashboard
end
