/**
 * AUTO-GENERATED FILE @ Wed, 06 Oct 2021 07:53:03 GMT - DO NOT EDIT!
 *
 * This file was automatically generated by schemats v.0.0.10
 * $ schemats generate postgres://username:password@localhost:5432/gwak2837 -s public
 *
 */

export interface user {
  id: string
  creation_time: Date
  modification_time: Date
  email: string
  password_hash: string
  logout_time: Date
}

export interface post {
  id: number
  creation_time: Date
  modification_time: Date
  title: string
  contents: string
}

export interface Tables {
  user: user
  post: post
}
