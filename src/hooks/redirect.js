import { useRouter } from "next/router";

const useRedirect = () => {
  const router = useRouter()

  const loginCheck = (user, url, message) => {
    if (!user) {
      alert(message)
      router.push({
        pathname: url,
      })
    }
  }

  return {
    loginCheck,
  }
}

export default useRedirect;