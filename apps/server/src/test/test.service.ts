import { Injectable } from '@nestjs/common'
import { resumeDataSchema } from '@reactive-resume/schema'
import { zodToJsonSchema } from 'zod-to-json-schema'

@Injectable()
export class TestService {
  public getResumeDataSchema() {
    return zodToJsonSchema(resumeDataSchema)
  }
}
