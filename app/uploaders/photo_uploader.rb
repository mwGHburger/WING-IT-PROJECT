class PhotoUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  process convert: 'jpg'

  version :small_card do
    process :resize_to_fill => [360, 500]
  end
end
