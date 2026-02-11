'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle2 } from 'lucide-react'

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  countryCode: z.string().min(1, 'Please select a country code'),
  phone: z.string().min(5, 'Phone number must be at least 5 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  areaOfInterest: z.string().min(1, 'Please select an area of interest'),
  specificRole: z.string().min(1, 'Please select or enter a specific role'),
})

type FormData = z.infer<typeof formSchema>

const countryCodes = [
  { code: '+1', country: 'US/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+86', country: 'China' },
  { code: '+7', country: 'Russia' },
]

const areaRolesMap: Record<string, string[]> = {
  Tech: ['Web Developer', 'Data Scientist', 'UI/UX Designer', 'Software Engineer', 'DevOps Engineer'],
  Business: ['Sales Manager', 'Business Analyst', 'Account Manager', 'Operations Manager'],
  Agriculture: ['Agricultural Specialist', 'Farm Manager', 'Agronomist', 'Supply Chain Manager'],
  Marketing: ['Marketing Specialist', 'Social Media Manager', 'Content Creator', 'SEO Specialist'],
  Finance: ['Financial Analyst', 'Accountant', 'Investment Banker', 'Tax Consultant'],
  Healthcare: ['Healthcare Administrator', 'Medical Coder', 'Clinical Research Associate'],
  Other: ['Project Manager', 'HR Manager', 'Customer Service Representative', 'Administrative Assistant'],
}

interface JobApplicationFormProps {
  preselectedRole?: string | null
  onSuccess?: () => void
}

export function JobApplicationForm({ preselectedRole, onSuccess }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedArea, setSelectedArea] = useState<string>('')
  const [isCustomRole, setIsCustomRole] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: '+1',
      areaOfInterest: '',
      specificRole: preselectedRole || '',
    },
  })

  const watchArea = watch('areaOfInterest')
  const availableRoles = watchArea ? areaRolesMap[watchArea] || [] : []

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // EmailJS configuration - Use environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

      // Check if keys are configured
      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        alert('Email service is not configured. Please contact the administrator or try again later.')
        setIsSubmitting(false)
        return
      }

      const templateParams = {
        to_email: 'applyHireXelence@gmail.com',
        from_name: data.fullName,
        from_email: data.email,
        phone: `${data.countryCode} ${data.phone}`,
        date_of_birth: data.dateOfBirth,
        area_of_interest: data.areaOfInterest,
        specific_role: data.specificRole,
        message: `New job application received from ${data.fullName} for ${data.specificRole} position.`,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setIsSuccess(true)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Failed to submit application. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 className="w-16 h-16 text-[#00B140] mb-4" />
        <h3 className="text-2xl font-bold text-[#001F54] mb-2">Application Submitted!</h3>
        <p className="text-gray-600">Thank you for your interest. We'll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          {...register('fullName')}
          placeholder="John Doe"
          className="mt-1"
        />
        {errors.fullName && (
          <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="john@example.com"
          className="mt-1"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex gap-2 mt-1">
          <Select
            defaultValue="+1"
            onValueChange={(value) => setValue('countryCode', value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((item) => (
                <SelectItem key={item.code} value={item.code}>
                  {item.code} {item.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="1234567890"
            className="flex-1"
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          {...register('dateOfBirth')}
          className="mt-1"
        />
        {errors.dateOfBirth && (
          <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth.message}</p>
        )}
      </div>

      {/* Area of Interest */}
      <div>
        <Label htmlFor="areaOfInterest">Area of Interest</Label>
        <Select
          onValueChange={(value) => {
            setValue('areaOfInterest', value)
            setValue('specificRole', '')
            setSelectedArea(value)
            setIsCustomRole(value === 'Other')
          }}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select an area" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(areaRolesMap).map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.areaOfInterest && (
          <p className="text-sm text-red-600 mt-1">{errors.areaOfInterest.message}</p>
        )}
      </div>

      {/* Specific Role - Conditional */}
      <div>
        <Label htmlFor="specificRole">Specific Role</Label>
        {isCustomRole ? (
          <>
            <Input
              id="specificRole"
              {...register('specificRole')}
              placeholder="Enter your desired role"
              className="mt-1"
            />
          </>
        ) : (
          <Select
            disabled={!watchArea}
            onValueChange={(value) => setValue('specificRole', value)}
            defaultValue={preselectedRole || ''}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={watchArea ? "Select a role" : "Select area first"} />
            </SelectTrigger>
            <SelectContent>
              {availableRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.specificRole && (
          <p className="text-sm text-red-600 mt-1">{errors.specificRole.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#00B140] hover:bg-[#009635] text-white py-6 text-base font-semibold"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  )
}
