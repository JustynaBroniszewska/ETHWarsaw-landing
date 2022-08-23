const body = document.querySelector('body')

const renderSpeaker = (speaker, parent) => {
  const speakerItem = document.createElement('div')
  speakerItem.classList.add('speaker')

  const renderSpeakerName = (name) => {
    if (name != undefined) {
      return `<h6 class="speaker__name">${speaker.name}</h6>`
    } else {
      return ''
    }
  }
  const renderSpeakeProject = (project) => {
    if (project != undefined) {
      return `<span class="speaker__project">${speaker.project}</span>`
    } else {
      return ''
    }
  }

  const renderSocial = (social) => {
    const socialLink = document.createElement('a')
    socialLink.classList.add('speaker__social')
    socialLink.href = social[Object.keys(social)]
    socialLink.target = "_blank"
    socialLink.rel = "noopener noreferrer"

    if (social["twitter"]) {
      socialLink.innerHTML = `
        <svg viewBox="0 0 512 512" fill="none" color="currentColor"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" fill="currentColor"/></svg>
      `
    } else if (social["linkedin"]) {
      socialLink.innerHTML = `
        <svg viewBox="0 0 448 512" fill="none" color="currentColor"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" fill="currentColor"/></svg>
      `
    } else if (social["website"]) {
      socialLink.innerHTML = `
        <svg viewBox="0 0 48 48" fill="none" color="currentColor"><path d="M24 44q-4.2 0-7.85-1.575Q12.5 40.85 9.8 38.15q-2.7-2.7-4.25-6.375Q4 28.1 4 23.9t1.55-7.825Q7.1 12.45 9.8 9.75t6.35-4.225Q19.8 4 24 4q4.2 0 7.85 1.525Q35.5 7.05 38.2 9.75q2.7 2.7 4.25 6.325Q44 19.7 44 23.9t-1.55 7.875Q40.9 35.45 38.2 38.15t-6.35 4.275Q28.2 44 24 44Zm0-2.9q1.75-1.8 2.925-4.125Q28.1 34.65 28.85 31.45H19.2q.7 3 1.875 5.4Q22.25 39.25 24 41.1Zm-4.25-.6q-1.25-1.9-2.15-4.1-.9-2.2-1.5-4.95H8.6Q10.5 35 13 37.025q2.5 2.025 6.75 3.475Zm8.55-.05q3.6-1.15 6.475-3.45 2.875-2.3 4.625-5.55h-7.45q-.65 2.7-1.525 4.9-.875 2.2-2.125 4.1Zm-20.7-12h7.95q-.15-1.35-.175-2.425-.025-1.075-.025-2.125 0-1.25.05-2.225.05-.975.2-2.175h-8q-.35 1.2-.475 2.15T7 23.9q0 1.3.125 2.325.125 1.025.475 2.225Zm11.05 0H29.4q.2-1.55.25-2.525.05-.975.05-2.025 0-1-.05-1.925T29.4 19.5H18.65q-.2 1.55-.25 2.475-.05.925-.05 1.925 0 1.05.05 2.025.05.975.25 2.525Zm13.75 0h8q.35-1.2.475-2.225Q41 25.2 41 23.9q0-1.3-.125-2.25T40.4 19.5h-7.95q.15 1.75.2 2.675.05.925.05 1.725 0 1.1-.075 2.075-.075.975-.225 2.475Zm-.5-11.95h7.5q-1.65-3.45-4.525-5.75Q32 8.45 28.25 7.5q1.25 1.85 2.125 4t1.525 5Zm-12.7 0h9.7q-.55-2.65-1.85-5.125T24 7q-1.6 1.35-2.7 3.55-1.1 2.2-2.1 5.95Zm-10.6 0h7.55q.55-2.7 1.4-4.825.85-2.125 2.15-4.125-3.75.95-6.55 3.2T8.6 16.5Z" fill="currentColor"/></svg>
      `
    }

    return socialLink
  }

  const renderSpeakerSocials = (socials) => {
    const socialsList = document.createElement('div')
    socialsList.classList.add('speaker__socials')
    socials && socials.map((social) => social && socialsList.appendChild(renderSocial(social)))
    return socialsList
  }

  speakerItem.innerHTML = `
    <img class="speaker__image" src="${speaker.image ?? '/images/speaker_placeholder.svg'}" alt="${speaker.name + ' ' ?? ''}image"/>
    ${renderSpeakerName(speaker.name)}
    ${renderSpeakeProject(speaker.project)}
  `
  speakerItem.appendChild(renderSpeakerSocials(speaker.socials))

  parent.appendChild(speakerItem)
}

const handleSpeakersFetch = () => {
  const speakersGrid = body.querySelector('#speakers__grid.speakers__grid')
  const speakersLoader = document.createElement('span')
  speakersLoader.classList.add('speakers-loader')
  speakersLoader.innerHTML = `We're trying to load ETHWarsaw speakers...`
  speakersGrid.appendChild(speakersLoader)

  fetch(`/speakers/speakers.json`)
    .then((response) => {
      if (response.ok) {
        return response
      }
      Promise.reject('Failed to load data with ETHWarsaw speakers.')
      throw new Error('Failed to load data with ETHWarsaw speakers')
    })
    .then(response => response.json())
    .then(json => {
      speakersGrid.removeChild(speakersLoader)
      return json.speakers.forEach((speaker) => {
        renderSpeaker(speaker, speakersGrid)
      })
    })
}

handleSpeakersFetch()