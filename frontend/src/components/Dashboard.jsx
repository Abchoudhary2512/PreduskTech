import { useState } from "react"
import toast from "react-hot-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import useSWRMutation from "swr/mutation"

const API = "http://localhost:5000"

// Helpers
const jsonFetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

// Panels
function ProfilePanel() {
  const [email, setEmail] = useState("")

  const { trigger, data, isMutating, error, reset } = useSWRMutation(
    email ? `${API}/profile/${encodeURIComponent(email)}` : null,
    (url) => jsonFetcher(url),
  )

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter an email address.")
      return
    }
    try {
      await trigger()
      toast.success("Profile fetched successfully!")
    } catch (err) {
      toast.error(err?.message || "No profile found for this email.")
    }
  }

  return (
    <Card className="border rounded-lg">
      <CardHeader>
        <CardTitle className="text-balance">Get Profile</CardTitle>
        <CardDescription>Fetch a user profile by email.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) reset()
              }}
              aria-label="Email address"
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={isMutating}>
              {isMutating ? "Fetching..." : "Fetch"}
            </Button>
          </div>
        </form>

        {error && (
          <Alert variant="destructive" role="alert">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Profile not found or API error.</AlertDescription>
          </Alert>
        )}

        {!isMutating && !data && !error && (
          <p className="text-sm text-muted-foreground">Enter an email and click Fetch to view profile details.</p>
        )}

        {isMutating && (
          <div className="space-y-3 animate-pulse">
            <div className="h-5 w-40 bg-muted rounded" />
            <div className="h-4 w-64 bg-muted rounded" />
            <div className="h-4 w-72 bg-muted rounded" />
            <div className="h-4 w-56 bg-muted rounded" />
          </div>
        )}

        {data && (
          <div className="space-y-4" aria-live="polite">
            <div>
              <h3 className="font-semibold text-lg">{data.name}</h3>
              <p className="text-sm text-muted-foreground">{data.email}</p>
              {data.education && <p className="text-sm mt-1">Education: {data.education}</p>}
            </div>

            {data.skills && data.skills.length > 0 && (
              <section>
                <h4 className="font-semibold mb-2">Skills</h4>
                <ul className="flex flex-wrap gap-2">
                  {data.skills.map((s) => (
                    <li key={s.id}>
                      <Badge variant="secondary">
                        {s.skill_name}
                        {s.level ? ` · ${s.level}` : ""}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {data.projects && data.projects.length > 0 && (
              <section>
                <h4 className="font-semibold mb-2">Projects</h4>
                <ul className="list-disc ml-6 space-y-1">
                  {data.projects.map((p) => (
                    <li key={p.id} className="text-sm">
                      <span className="font-medium">{p.title}</span>
                      {p.description ? ` — ${p.description}` : ""}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {data.work && data.work.length > 0 && (
              <section>
                <h4 className="font-semibold mb-2">Work</h4>
                <ul className="list-disc ml-6 space-y-1">
                  {data.work.map((w) => (
                    <li key={w.id} className="text-sm">
                      <span className="font-medium">{w.company}</span>
                      {w.position ? ` (${w.position})` : ""}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {data.links && (
              <section className="grid gap-1">
                <h4 className="font-semibold">Links</h4>
                <div className="text-sm">
                  {data.links.github && (
                    <p>
                      GitHub:{" "}
                      <a className="text-primary underline" href={data.links.github} target="_blank" rel="noreferrer">
                        {data.links.github}
                      </a>
                    </p>
                  )}
                  {data.links.linkedin && (
                    <p>
                      LinkedIn:{" "}
                      <a className="text-primary underline" href={data.links.linkedin} target="_blank" rel="noreferrer">
                        {data.links.linkedin}
                      </a>
                    </p>
                  )}
                  {data.links.portfolio && (
                    <p>
                      Portfolio:{" "}
                      <a className="text-primary underline" href={data.links.portfolio} target="_blank" rel="noreferrer">
                        {data.links.portfolio}
                      </a>
                    </p>
                  )}
                </div>
              </section>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SearchPanel({ query, setQuery }) {
  const { trigger, data, isMutating, error, reset } = useSWRMutation(
    query.trim() ? `${API}/search?q=${encodeURIComponent(query.trim())}` : null,
    (url) => jsonFetcher(url),
  )

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) {
      toast.error("Enter a name, project, or skill.")
      return
    }
    try {
      await trigger()
      toast.success("Search completed!")
    } catch (err) {
      toast.error(err?.message || "Search failed. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Search</CardTitle>
        <CardDescription>Search across profiles, projects, and skills.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="query">Query</Label>
            <Input
              id="query"
              type="text"
              placeholder="Enter query (name, project, skill)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                if (error) reset()
              }}
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={isMutating}>
              {isMutating ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>

        {error && (
          <Alert variant="destructive" role="alert">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Search failed. Check your API and try again.</AlertDescription>
          </Alert>
        )}

        {!isMutating && !data && !error && (
          <p className="text-sm text-muted-foreground">Enter a query and click Search to see results.</p>
        )}

        {isMutating && (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 w-48 bg-muted rounded" />
            <div className="h-4 w-56 bg-muted rounded" />
            <div className="h-4 w-40 bg-muted rounded" />
          </div>
        )}

        {data && (
          <div className="grid md:grid-cols-3 gap-6" aria-live="polite">
            <section>
              <h4 className="font-semibold mb-2">Profiles</h4>
              {data.profiles?.length ? (
                <ul className="list-disc ml-6 space-y-1">
                  {data.profiles.map((p) => (
                    <li key={p.id} className="text-sm">
                      {p.name} {p.email ? <span className="text-muted-foreground">— {p.email}</span> : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No profiles found.</p>
              )}
            </section>

            <section>
              <h4 className="font-semibold mb-2">Projects</h4>
              {data.projects?.length ? (
                <ul className="list-disc ml-6 space-y-1">
                  {data.projects.map((p) => (
                    <li key={p.id} className="text-sm">
                      {p.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No projects found.</p>
              )}
            </section>

            <section>
              <h4 className="font-semibold mb-2">Skills</h4>
              {data.skills?.length ? (
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s) => (
                    <Badge key={s.id} variant="outline">
                      {s.skill_name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No skills found.</p>
              )}
            </section>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ProjectsBySkillPanel({ query }) {
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [errMsg, setErrMsg] = useState(null)

  const load = async () => {
    if (!query.trim()) {
      toast.error("Enter a skill in the Search box above.")
      return
    }
    try {
      setIsLoading(true)
      setErrMsg(null)
      const res = await fetch(`${API}/projects?skill=${encodeURIComponent(query.trim())}`)
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setProjects(data)
      if (!data?.length) {
        toast("No projects found. Try a different skill keyword.")
      } else {
        toast.success("Projects loaded successfully!")
      }
    } catch (e) {
      const msg = e?.message || "Failed to load projects."
      setErrMsg(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Projects by Skill</CardTitle>
        <CardDescription>Use the same query above as the skill filter.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Button onClick={load} variant="secondary" disabled={isLoading}>
            {isLoading ? "Loading..." : "Load"}
          </Button>
        </div>

        {errMsg && (
          <Alert variant="destructive" role="alert">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errMsg}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !projects.length && !errMsg && (
          <p className="text-sm text-muted-foreground">
            Enter a skill in the Search box, then click Load to see matching projects.
          </p>
        )}

        {isLoading && (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 w-56 bg-muted rounded" />
            <div className="h-4 w-64 bg-muted rounded" />
            <div className="h-4 w-52 bg-muted rounded" />
          </div>
        )}

        {!isLoading && projects.length > 0 && (
          <ul className="list-disc ml-6 space-y-1" aria-live="polite">
            {projects.map((p) => (
              <li key={p.id} className="text-sm">
                {p.title}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [query, setQuery] = useState("")

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-balance">PreduskTech Dashboard</h1>
        <p className="text-muted-foreground">Lookup profiles, search globally, and find projects by skill.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfilePanel />
        <SearchPanel query={query} setQuery={setQuery} />
      </div>

      <ProjectsBySkillPanel query={query} />
    </main>
  )
}
