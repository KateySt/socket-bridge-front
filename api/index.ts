export const googleLink=`${process.env.NEXT_PUBLIC_URL_GOOGLE}/realms/spring-boot-mic/protocol/openid-connect/auth?client_id=mic-auth&redirect_uri=${process.env.NEXT_PUBLIC_URL_BACK}/user/api/exchange-code&response_type=code&scope=openid&kc_idp_hint=google`

export const userApi = {
  getUsers: "/users"
}