import Store from "@/store"

export default function getPageTitle(pageTitle) {
  const title = Store.state.config.appTitle
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}