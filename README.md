# README
<!-- chatspace機能
　　　user(id email password nickname)
     chatroom(id)
     message(id text)
     image(id) -->

## usersテーブル
<!-- userは多-多の関係をchatroomと, １ー多の関係をmassageと, １ー多の関係をimageと持っている -->
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :messages
- has_many :images
- has_many :chatrooms throgh: :users_chatrooms

## chatroomsテーブル
<!-- chatroomは多-多の関係をuserと, １ー多の関係をmassageと, １ー多の関係をimageと持っている -->
|Column|Type|Options|
|------|----|-------|
|title|text|null: false|
### Association
- has_many :messages
- has_many :images
- has_many :users throgh: :users_chatrooms

## users_chatroomsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|chatroom_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chatroom

## messagesテーブル
<!-- messageは多-多の関係をimageと, １ー多の関係をuserと, １ー多の関係をchatroomと持っている -->
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chatroom 
- has_many :images through: :messages_images

## imagesテーブル
<!-- imageは多-多の関係をmessageと, １ー多の関係をuserと, １ー多の関係をchatroomと持っている -->
|Column|Type|Options|
|------|----|-------|
|image|text|null: false|
### Association
- belongs_to :user
- belongs_to :chatroom 
- has_many  :messages,  through:  :messages_images

## messages_imagesテーブル
|Column|Type|Options|
|------|----|-------|
|message_id|integer|null: false, foreign_key: true|
|image_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chatroom


<!-- This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->
