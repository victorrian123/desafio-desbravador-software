import axios from 'axios'

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github.v3+json' },
})

export async function fetchUser(username) {
  const { data } = await githubApi.get(`/users/${username}`)
  return data
}

export async function fetchUserRepos(username) {
  const allRepos = []
  let currentPage = 1

  while (true) {
    const { data } = await githubApi.get(`/users/${username}/repos`, {
      params: { per_page: 100, page: currentPage },
    })
    allRepos.push(...data)
    if (data.length < 100) break
    currentPage++
  }

  return allRepos
}

export async function fetchRepoDetails(username, repoName) {
  const { data } = await githubApi.get(`/repos/${username}/${repoName}`)
  return data
}

export async function fetchRepoLanguages(username, repoName) {
  const { data } = await githubApi.get(`/repos/${username}/${repoName}/languages`)
  return data
}
