import React from 'react'
import AgenticAbout from '@/components/AgenticAI/About'
import AgenticCards from '@/components/AgenticAI/AgenticCards'
import CoreCapabilities from '@/components/AgenticAI/CoreCapabilities'
import AgentSteps from '@/components/AgenticAI/AgentSteps'
import HowAgenticWorks from '@/components/AgenticAI/HowAgenticWorks'
import BookDemo from '@/components/AgenticAI/BookDemo'

const AgenticAI = () => {
  return (
    <>
        <AgenticAbout />
        <AgenticCards />
        <CoreCapabilities />
        <AgentSteps />
        <HowAgenticWorks />
        <BookDemo />
    </>
  )
}

export default AgenticAI