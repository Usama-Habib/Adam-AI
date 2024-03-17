
'use client'

import * as React from "react"

import Link from "next/link"

import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"

  import Logo from "./logo"

  const components: { title: string, description: string}[] = [
    {
        title: "CHAT PDF AI",
    
        description:
          "Get a summary or review of your documents, chat to your pdf-document and ask question about the content.",
    },  
      {
        title: "IMAGE UPSCALER AI",
    
        description:
          "Upscale your low-resolution images and get the best out them.",
      },
      {
        title: "TRANSCRIPT VIDEO AI",
    
        description:
          "Simply put in your video url and receive your matching transcript written in a PDFfile.",
      },
      {
        title: "IMAGE DIFFUSION AI",
    
        description: "Create stunning high-resolution images to use in your content or advertising.",
      },
      {
        title: "LOGO CREATOR AI",
    
        description:
          "Create stunning logos or trademark symbols for your running brand or project.",
      },
      {
        title: "CREATE CONTENT AI",
     
        description:
          "Create usable professional text content,storyboards, CVs, Reports, Summarys and many other usefull content.",
      },
  ]



  export function NavigationMenuBar() {
    return (
      <NavigationMenu>
        <NavigationMenuList
        className="hidden md:flex md:space-x-4"
        
        
        
        >
          <NavigationMenuItem>
            <NavigationMenuTrigger>Find out more</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Logo  />
                      <div className="mb-2 mt-4 text-lg font-medium">
                       AAL
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                      AI-enhaced tools for your creative work.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem  title="Documentary">
                    Learn all the features of our  powerful applications.
                </ListItem>
                <ListItem  title="API">
                  How to connect via API in seconds.
                </ListItem>
                <ListItem  title="Community">
                    Join our our community via our Discord Channel. Ask questions and receive feedback to all our applications.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-5 p-4 md:w-[500px] md:grid-cols-3 lg:w-[800px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
              className="font-medium"
              >
                API
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="
              font-medium">
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        
        </NavigationMenuList>
      </NavigationMenu>
    )
  }
   
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"