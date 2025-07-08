"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Bell, Phone } from "lucide-react"

export function AlertsDialog() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const validatePhoneNumber = (number: string) => {
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, "")

    if (cleanNumber.length === 0) {
      return "Phone number is required"
    }

    if (cleanNumber.length < 10) {
      return "Phone number must be exactly 10 digits"
    }

    if (cleanNumber.length > 10) {
      return "Phone number must be exactly 10 digits"
    }

    return ""
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow digits and limit to 10 characters
    const cleanValue = value.replace(/\D/g, "").slice(0, 10)
    setPhoneNumber(cleanValue)

    // Clear error when user starts typing
    if (error) {
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validatePhoneNumber(phoneNumber)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Alerts Activated!",
        description: `Real-time alerts will be sent to +91 ${phoneNumber}`,
      })
      setIsOpen(false)
      setPhoneNumber("")
      setError("")
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Bell className="h-4 w-4" />
          Send Real-time Alerts
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Setup Real-time Alerts
          </DialogTitle>
          <DialogDescription>
            Enter your phone number to receive real-time portfolio alerts and market updates via SMS.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">+91</span>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className={error ? "border-red-500" : ""}
                  maxLength={10}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <p className="text-xs text-muted-foreground">
                You'll receive alerts for price changes, portfolio rebalancing suggestions, and market updates.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false)
                setPhoneNumber("")
                setError("")
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Setting up..." : "Activate Alerts"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
