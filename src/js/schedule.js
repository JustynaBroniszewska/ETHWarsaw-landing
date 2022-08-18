const body = document.querySelector('body')
const scheduleDaysList = body.querySelector('.schedule__days-list')
const scheduleTables = body.querySelector('.schedule__tables')

const renderDayButton = (date, index) => {
  const dayButton = document.createElement('button')
  dayButton.classList.add('schedule__day')
  if (index < 1) {
    dayButton.classList.add('schedule__day--active')
  }
  dayButton.dataset.scheduleDate = date.date
  dayButton.innerHTML = date.date
  scheduleDaysList.appendChild(dayButton)
}

const renderTab = (parent, name, active) => {
  const dayTab = document.createElement('button')
  dayTab.classList.add('schedule__table-tab')
  if (active === true) {
    dayTab.classList.add('schedule__table-tab--active')
  }
  dayTab.dataset.scheduleStage = name
  dayTab.innerHTML = name
  parent.appendChild(dayTab)
}

const renderEvent = (parent, eventData) => {
  const eventItem = document.createElement('div')
  eventItem.classList.add('schedule__table-event')
  const eventItemButton = document.createElement('button')
  eventItemButton.classList.add('schedule__table-event-button')
  const eventItemBody = document.createElement('div')
  eventItemBody.classList.add('schedule__table-event-body')
  const eventTime = () => {
    if (eventData.time) {
      return `<span class="schedule__table-event-time">${eventData.time}</span>`
    }
    return ''
  }
  const eventTitle = () => {
    if (eventData.title) {
      return `<span class="schedule__table-event-title">${eventData.title}</span>`
    }
    return ''
  }
  const eventDescription = () => {
    if (eventData.description) {
      return `<p class="schedule__table-event-description">${eventData.description}</p>`
    }
    return ''
  }
  const eventSpeakers = () => {
    if (eventData.speakers) {
      return `
        <div class="schedule__table-event-speakers">
          ${eventData.speakers.forEach((item) => `<span class="schedule__table-event-speaker">${item.name ?? ''}</span>`)}
        </div>
      `
    }
    return ''
  }
  eventItemButton.innerHTML = `
    ${eventTime()}
    ${eventTitle()}
    <svg class="schedule__table-event-arrow" viewBox="0 0 448 512" fill="none" color="currentColor"><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" fill="currentColor"/></svg>
  `
  eventItemBody.innerHTML = `
    ${eventSpeakers()}
    ${eventDescription()}
  `
  eventItem.appendChild(eventItemButton)
  eventItem.appendChild(eventItemBody)
  parent.appendChild(eventItem)
}

const renderStage = (stageSchedule, parent, name, active) => {
  const dayStage = document.createElement('div')
  dayStage.classList.add('schedule__table-stage')
  if (active === true) {
    dayStage.classList.add('schedule__table-stage--active')
  }
  dayStage.dataset.scheduleStage = name

  const stageUpdateTitle = document.createElement('p')
  stageUpdateTitle.classList.add('schedule__table-stage-title')
  stageUpdateTitle.innerHTML = 'schedule will be updated soon'
  dayStage.appendChild(stageUpdateTitle)

  const stageEvents = document.createElement('div')
  stageEvents.classList.add('schedule__table-stage-events')

  stageSchedule.events.forEach((event) => renderEvent(stageEvents, event))
  dayStage.appendChild(stageEvents)
  parent.appendChild(dayStage)
}

const renderDayTable = (date, index) => {
  const dayTable = document.createElement('div')
  dayTable.classList.add('schedule__table')
  if (index < 1) {
    dayTable.classList.add('schedule__table--active')
  }
  dayTable.dataset.scheduleDate = date.date
  const dayTabs = document.createElement('div')
  dayTabs.classList.add('schedule__table-tabs')
  dayTable.appendChild(dayTabs)
  const dayStages = document.createElement('div')
  dayStages.classList.add('schedule__table-stages')
  dayTable.appendChild(dayStages)

  if (date.mainStage) {
    renderTab(dayTabs, 'Main stage', true)
    renderStage(date.mainStage, dayStages, 'Main stage', true)
  }
  if (date.workshopStage) {
    renderTab(dayTabs, 'Workshop stage', false)
    renderStage(date.workshopStage, dayStages, 'Workshop stage', false)
  }
  scheduleTables.appendChild(dayTable)
}

const handleEventToggle = (target) => {
  const eventItem = target.parentNode
  eventItem.classList.toggle('schedule__table-event--active')
}

const handleTabsToggle = (target, table) => {
  const tableTabs = table.querySelectorAll('.schedule__table-tab')
  tableTabs.forEach((tab) => tab.classList.remove('schedule__table-tab--active'))
  target.classList.add('schedule__table-tab--active')

  const tableStages = table.querySelectorAll('.schedule__table-stage')
  tableStages.forEach((stage) => stage.classList.remove('schedule__table-stage--active'))
  const activeStage = table.querySelector(`.schedule__table-stage[data-schedule-stage="${target.dataset.scheduleStage}"]`)
  activeStage.classList.add('schedule__table-stage--active')
}

const handleScheduleClicks = (event, table) => {
  if (event.target.classList.contains('schedule__table-tab')) {
    handleTabsToggle(event.target, table)
  }
  if (event.target.classList.contains('schedule__table-event-button')) {
    handleEventToggle(event.target)
  }
}

const handleDayClicks = (event) => {
  const target = event.target
  if (target.classList.contains('schedule__day')) {
    const dayButtons = body.querySelectorAll('.schedule__day')
    const tables = body.querySelectorAll('.schedule__table')
    dayButtons.forEach((button) => button.classList.remove('schedule__day--active'))
    target.classList.add('schedule__day--active')
    tables.forEach((table) => table.classList.remove('schedule__table--active'))
    const activeTable = body.querySelector(`.schedule__table[data-schedule-date="${target.dataset.scheduleDate}"]`)
    activeTable.classList.add('schedule__table--active')
  }
}

fetch(`https://api.npoint.io/160e8778a2e23e1be80e`)
  .then((response) => response.status === 200 ? response : Promise.reject('Failed to load data for ETHWarsaw schedule.'))
  .then(response => response.json())
  .then(json => json.scheduleData.forEach((date, index) => {
    renderDayButton(date, index)
    renderDayTable(date, index)
  }))
  .then(
    () => {
      const scheduleDays = body.querySelector('.schedule__days')
      scheduleDays.addEventListener('click', (event) => handleDayClicks(event))
      const tables = body.querySelectorAll('.schedule__table')
      tables.forEach((table) => table.addEventListener('click', (event) => handleScheduleClicks(event, table)))
    }
  )

